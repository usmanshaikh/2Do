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

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  let isRefreshing: boolean = false;
  let refreshSubscribers: any = [];
  let requestsCount: any = [];
  let requestsIndex: number = 0;

  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token: string) => {
    refreshSubscribers.map((cb) => cb(token));
  };

  const logout = () => {
    dispatch(clearTokens());
    navigate(`/${ROUTES.LOGIN}`);
  };

  const removeRequest = (req) => {
    requestsCount = requestsCount.filter((arr) => arr.reqIdx !== req.reqIdx);
    if (!requestsCount.length) dispatch(hideLoader());
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

  const resErrInterceptor = async (error) => {
    removeRequest(error.config);

    const { config, response } = error;
    const originalRequest = config;

    if ((response?.status === 401 || response?.status === 498) && !config.url.includes("auth/")) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = auth.refreshToken as string;
        authApi
          .refreshTokens({ refreshToken })
          .then(({ data }) => {
            isRefreshing = false;
            const newAccessToken = data.access.token;
            const newRefreshToken = data.refresh.token;
            dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
            onRefreshed(newAccessToken);
          })
          .catch(() => {
            isRefreshing = false;
            logout();
          });
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
      console.clear();
      return retryOrigReq.then((response) => response);
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

export { useAxiosInterceptor, axiosInstance as axios, NO_LOADER };
