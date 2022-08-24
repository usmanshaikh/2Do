import axios from "axios";
import AuthAPI from "./AuthAPI";
import * as Helpers from "../utils/Helpers";

let isRefreshing = false;
let refreshSubscribers = [];
let requestsCount = [];
let requestsIndex = 0;

const removeRequest = (req) => {
  requestsCount = requestsCount.filter((arr) => arr.reqIdx !== req.reqIdx);
  if (!requestsCount.length) Helpers.hideLoader();
};

const addRequest = (config) => {
  requestsIndex = requestsIndex + 1;
  config["reqIdx"] = requestsIndex;
  requestsCount.push(config);
};

const axiosInstance = axios.create({
  // baseURL: `http://${process.env.REACT_APP_IP}:3000/v1/`,
  baseURL: "http://localhost:3000/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers.noLoader) {
    } else {
      Helpers.showLoader();
      addRequest(config);
    }
    const token = Helpers.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    removeRequest(error.config);
    return Promise.reject(error.config);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    removeRequest(response.config);
    return response.data;
  },
  (error) => {
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
  }
);

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
