import axios from "axios";
import { useEffect, useState } from "react";
import AuthAPI from "./AuthAPI";
import * as Helpers from "../utils/Helpers";
import { useGlobalContext } from "../utils/hooks";

let isRefreshing = false;
let refreshSubscribers = [];
let requestsCount = [];
let requestsIndex = 0;

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInterceptor = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setShowLoaderHandler } = useGlobalContext();

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
        AuthAPI.refreshTokens({ refreshToken }).then((tk) => {
          isRefreshing = false;
          const accessToken = tk.access.token;
          const refreshToken = tk.refresh.token;
          Helpers.setLocalAccessToken(accessToken);
          Helpers.setLocalRefreshToken(refreshToken);
          onRrefreshed(accessToken);
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
    console.log("useEffect1");
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

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
}

export const NO_LOADER = {
  headers: {
    noLoader: true,
  },
};

export default axiosInstance;
export { AxiosInterceptor };
