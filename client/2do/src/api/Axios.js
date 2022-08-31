import { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Helpers from "../utils/Helpers";
import constants from "../utils/constants";
import AuthAPI from "./AuthAPI";

const NO_LOADER = { headers: { noLoader: true } };

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/v1/`,
  // baseURL: "http://localhost:3000/v1/",
  headers: { "Content-Type": "application/json" },
});

const ROUTE = constants.routePath;

const AxiosInterceptor = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { setShowLoaderHandler, setAuthenticateHandler } = useGlobalContext();

  let isRefreshing = false;
  let refreshSubscribers = [];
  let requestsCount = [];
  let requestsIndex = 0;

  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  const onRrefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
  };

  const logout = () => {
    localStorage.clear();
    setAuthenticateHandler(false);
    navigate(`/${ROUTE.LOGIN}`);
  };

  const removeRequest = (req) => {
    setTimeout(() => {
      requestsCount = requestsCount.filter((arr) => arr.reqIdx !== req.reqIdx);
      if (!requestsCount.length) setShowLoaderHandler(false);
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
      setShowLoaderHandler(true);
      addRequest(config);
    }
    const token = Helpers.getLocalAccessToken();
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
    return response.data;
  };

  const resErrInterceptor = (error) => {
    removeRequest(error.config);
    // prettier-ignore
    const { config, response: { status } } = error;
    const originalRequest = config;

    if ((status === 401 || status === 498) && !config.url.includes("auth/")) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = Helpers.getLocalRefreshToken();
        AuthAPI.refreshTokens({ refreshToken })
          .then((tk) => {
            isRefreshing = false;
            const accessToken = tk.access.token;
            const refreshToken = tk.refresh.token;
            Helpers.setLocalAccessToken(accessToken);
            Helpers.setLocalRefreshToken(refreshToken);
            onRrefreshed(accessToken);
          })
          .catch(() => {
            isRefreshing = false;
            logout();
          });
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          // replace the expired token and retry
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
      console.clear();
      return retryOrigReq.then((response) => response.data);
    } else {
      return Promise.reject(error.response.data);
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
  }, []);

  return isLoaded ? children : null;
};

export { AxiosInterceptor, axiosInstance, NO_LOADER };
