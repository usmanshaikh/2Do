import axios from "axios";
import AuthAPI from "./AuthAPI";
import * as Helpers from "../utils/Helpers/Helpers";

let isRefreshing = false;
let refreshSubscribers = [];

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Helpers.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // prettier-ignore
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401 || status === 498) {
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
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
}

export default axiosInstance;
