import axios from "axios";

function getLocalAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    // const originalConfig = err.config;
    // if (err.response) {
    //   // Access Token was expired
    //   if (err.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;
    //     try {
    //       const rs = await refreshToken();
    //       const { accessToken } = rs.data;
    //       window.localStorage.setItem("accessToken", accessToken);
    //       instance.defaults.headers.common["x-access-token"] = accessToken;
    //       return instance(originalConfig);
    //     } catch (_error) {
    //       if (_error.response && _error.response.data) {
    //         return Promise.reject(_error.response.data);
    //       }
    //       return Promise.reject(_error);
    //     }
    //   }
    //   if (err.response.status === 403 && err.response.data) {
    //     return Promise.reject(err.response.data);
    //   }
    // }
    return Promise.reject(err);
  }
);

export default axiosInstance;
