import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authApi } from "../api";
import { ROUTES } from "../utils/constants";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { clearTokens, hideLoader, setTokens, showLoader, showSnackbar } from "../store/slices";

const NO_LOADER = { headers: { noLoader: true } };

const axiosInstance = axios.create({
  // baseURL: "http://ec2-3-108-252-93.ap-south-1.compute.amazonaws.com:3000/v1/", // Live
  baseURL: "http://localhost:3000/v1/", // Local
  headers: { "Content-Type": "application/json" },
});

const useAxiosInterceptor = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);

  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  let isRefreshing = false;
  let refreshSubscribers: any = [];
  let requestsCount: any = [];
  let requestsIndex = 0;

  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  const onRrefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
  };

  const logout = () => {
    dispatch(clearTokens());
    navigate(`/${ROUTES.LOGIN}`);
  };

  const removeRequest = (req) => {
    setTimeout(() => {
      requestsCount = requestsCount.filter((arr) => arr.reqIdx !== req.reqIdx);
      if (!requestsCount.length) dispatch(hideLoader());
    }, 500);
  };

  const addRequest = (config) => {
    requestsIndex = requestsIndex + 1;
    config["reqIdx"] = requestsIndex;
    requestsCount.push(config);
  };

  const reqInterceptor = (config) => {
    if (config.headers.noLoader) {
    } else {
      dispatch(showLoader());
      addRequest(config);
    }
    const token = auth.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  };

  const reqErrInterceptor = (error) => {
    removeRequest(error.config);
    return Promise.reject(error.config);
  };

  const resInterceptor = (response) => {
    removeRequest(response.config);
    return response;
  };

  const resErrInterceptor = (error) => {
    removeRequest(error.config);
    // prettier-ignore
    const { config, response: { status } } = error;
    const originalRequest = config;

    if ((status === 401 || status === 498) && !config.url.includes("auth/")) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = auth.refreshToken;
        if (refreshToken) {
          authApi
            .refreshTokens({ refreshToken })
            .then((tk: any) => {
              console.log("REFRESH TOKEN>", tk);
              isRefreshing = false;
              const accessToken = tk.access.token;
              const refreshToken = tk.refresh.token;
              dispatch(setTokens({ accessToken, refreshToken }));
              onRrefreshed(accessToken);
            })
            .catch(() => {
              isRefreshing = false;
              console.log("LOGOUT");
              logout();
            });
        }
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          // replace the expired token and retry
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
      console.clear();

      if (status !== 401) {
        dispatch(
          showSnackbar({
            message: error.response?.data?.message || "An error occurred",
            type: "error",
          })
        );
      }
      return retryOrigReq.then((response: any) => response);
    } else {
      return Promise.reject(error.response);
    }
  };

  useEffect(() => {
    const reqInterceptorEject = axiosInstance.interceptors.request.use(reqInterceptor, reqErrInterceptor);
    const resInterceptorEject = axiosInstance.interceptors.response.use(resInterceptor, resErrInterceptor);
    setIsLoaded(true);
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptorEject);
      axiosInstance.interceptors.response.eject(resInterceptorEject);
    };
  }, [auth.isLoggedIn, auth.accessToken, auth.refreshToken]);

  return isLoaded;
};
// const useAxiosInterceptor = () => {
//   const loader = useAppSelector((state: RootState) => state.loader);
//   const auth = useAppSelector((state: RootState) => state.auth);
//   const dispatch = useAppDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const navigate = useNavigate();

//   // Manage token refreshing and loader requests
//   let isRefreshing = false;
//   const refreshSubscribers: Array<(token: string) => void> = [];
//   const requestQueue: Record<number, any> = {};
//   let requestCounter = 0;

//   const onRefreshed = (token: string) => {
//     refreshSubscribers.forEach((cb) => cb(token));
//     refreshSubscribers.length = 0;
//   };

//   const addRequest = (config: any) => {
//     const requestId = ++requestCounter;
//     requestQueue[requestId] = config;
//     return requestId;
//   };

//   const removeRequest = (id: number) => {
//     delete requestQueue[id];
//     if (Object.keys(requestQueue).length === 0) {
//       dispatch(hideLoader());
//     }
//   };

//   const requestInterceptor = (config: any) => {
//     if (!config.headers.noLoader) {
//       dispatch(showLoader());
//       config.requestId = addRequest(config);
//     }

//     const accessToken = auth.accessToken;
//     console.log({ accessToken });

//     if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
//     return config;
//   };

//   const responseInterceptor = (response: any) => {
//     if (response.config.requestId) removeRequest(response.config.requestId);
//     return response.data;
//   };

//   const handleRefreshToken = (errorConfig: any) => {
//     if (!isRefreshing) {
//       isRefreshing = true;
//       const refreshToken = auth.refreshToken;
//       return (
//         refreshToken &&
//         authApi
//           .refreshTokens({ refreshToken })
//           .then(({ data }) => {
//             isRefreshing = false;
//             const accessToken = data.access.token;
//             const refreshToken = data.refresh.token;
//             dispatch(setTokens({ accessToken, refreshToken }));
//             onRefreshed(data.access.token);
//             return data.access.token;
//           })
//           .catch(() => {
//             isRefreshing = false;
//             // handleLogout();
//           })
//       );
//     }

//     return new Promise((resolve) => {
//       refreshSubscribers.push((token: string) => {
//         errorConfig.headers["Authorization"] = `Bearer ${token}`;
//         resolve(axiosInstance(errorConfig));
//       });
//     });
//   };

//   const responseErrorInterceptor = async (error: any) => {
//     if (error.config.requestId) removeRequest(error.config.requestId);

//     const { config, response } = error;
//     if (response?.status === 401 && !config.url.includes("auth/")) {
//       return handleRefreshToken(config);
//     }

//     dispatch(
//       showSnackbar({
//         message: error.response?.data?.message || "An error occurred",
//         type: "error",
//       })
//     );

//     return Promise.reject(error.response?.data || error);
//   };

//   const handleLogout = () => {
//     dispatch(clearTokens());
//     navigate(`/${ROUTES.LOGIN}`);
//   };

//   useEffect(() => {
//     const reqInterceptor = axiosInstance.interceptors.request.use(requestInterceptor, Promise.reject);
//     const resInterceptor = axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

//     setIsLoaded(true);
//     return () => {
//       axiosInstance.interceptors.request.eject(reqInterceptor);
//       axiosInstance.interceptors.response.eject(resInterceptor);
//     };
//   }, [auth.isLoggedIn, auth.accessToken, auth.refreshToken]);

//   return isLoaded;
// };

export { useAxiosInterceptor, axiosInstance as axios, NO_LOADER };
