import axios from "./axios";

const PATH = "auth";
const AuthAPI = {
  register(payload) {
    return axios.post(`${PATH}/register`, payload);
  },
  login(payload) {
    return axios.post(`${PATH}/login`, payload);
  },
};

export default AuthAPI;
