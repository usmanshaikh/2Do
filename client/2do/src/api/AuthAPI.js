import axios from "./axios";

const PATH = "auth";

const AuthAPI = {
  register(payload) {
    return axios.post(`${PATH}/register`, payload);
  },
  login(payload) {
    return axios.post(`${PATH}/login`, payload);
  },
  refreshTokens(payload) {
    return axios.post(`${PATH}/refresh-tokens`, payload);
  },
};

export default AuthAPI;
