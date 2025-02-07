import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authApi } from "../api";
import { ROUTES } from "../utils/constants";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { clearTokens, hideLoader, setTokens, showLoader } from "../store/slices";

const NO_LOADER = { headers: { noLoader: true } };

const axiosInstance = axios.create({
  // baseURL: "http://ec2-3-108-252-93.ap-south-1.compute.amazonaws.com:3000/v1/", // Prod
  baseURL: "http://localhost:3000/", // Local
  headers: { "Content-Type": "application/json" },
});

const useAxiosInterceptor = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  let isRefreshing = false;
  const refreshSubscribers: ((token: string) => void)[] = [];
  const requestsCount: { reqIdx: number }[] = [];
  let requestsIndex = 0;

  const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers.length = 0;
  };

  const logout = () => {
    dispatch(clearTokens());
    navigate(`/${ROUTES.LOGIN}`);
  };

  const removeRequest = (req: any) => {
    requestsCount.splice(requestsCount.indexOf(req), 1);
    if (requestsCount.length === 0) dispatch(hideLoader());
  };

  const addRequest = (config: any) => {
    requestsIndex += 1;
    config.reqIdx = requestsIndex;
    requestsCount.push(config);
  };

  const reqInterceptor = (config: any) => {
    if (!config.headers.noLoader) {
      dispatch(showLoader());
      addRequest(config);
    }
    const token = auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const reqErrInterceptor = (error: any) => {
    removeRequest(error.config);
    return Promise.reject(error);
  };

  const resInterceptor = (response: any) => {
    removeRequest(response.config);
    return response;
  };

  const resErrInterceptor = async (error: any) => {
    removeRequest(error.config);

    const { config, response } = error;
    const originalRequest = config;

    if ([401, 498].includes(response?.status) && !config.url.includes("auth/")) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = auth.refreshToken as string;
        authApi
          .refreshTokens({ refreshToken })
          .then(({ data }) => {
            isRefreshing = false;
            const newAccessToken = data.data.access.token;
            const newRefreshToken = data.data.refresh.token;
            dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
            onRefreshed(newAccessToken);
          })
          .catch(() => {
            isRefreshing = false;
            logout();
          });
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error.response);
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

export { useAxiosInterceptor, axiosInstance as axios, NO_LOADER };
