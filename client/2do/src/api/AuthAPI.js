import { axiosInstance as axios, NO_LOADER } from "./AxiosInterceptor";
import constants from "../utils/constants";

const API = constants.apiPath;

const AuthAPI = {
  register(payload) {
    return axios.post(API.AUTH.REGISTER, payload);
  },
  login(payload) {
    return axios.post(API.AUTH.LOGIN, payload);
  },
  forgotPassword(payload) {
    return axios.post(API.AUTH.FORGOT_PASSWORD, payload);
  },
  logout(payload) {
    return axios.post(API.AUTH.LOGOUT, payload);
  },
  refreshTokens(payload) {
    return axios.post(API.AUTH.REFRESH_TOKENS, payload, NO_LOADER);
  },
  resetPassword(payload, token) {
    return axios.post(API.AUTH.RESET_PASSWORD, payload, {
      params: {
        token,
      },
    });
  },
  verifyEmail(token) {
    return axios.post(API.AUTH.VERIFY_EMAIL, undefined, {
      params: {
        token,
      },
    });
  },
  sendVerificationEmail() {
    return axios.post(API.AUTH.SEND_VERIFICATION_EMAIL);
  },
};

export default AuthAPI;
