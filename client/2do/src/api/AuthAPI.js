import axios from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const AuthAPI = {
  register(payload) {
    return axios.post(API.REGISTER, payload);
  },
  login(payload) {
    return axios.post(API.LOGIN, payload);
  },
  forgotPassword(payload) {
    return axios.post(API.FORGOT_PASSWORD, payload);
  },
  logout(payload) {
    return axios.post(API.LOGOUT, payload);
  },
  refreshTokens(payload) {
    return axios.post(API.REFRESH_TOKENS, payload);
  },
  resetPassword(payload, token) {
    return axios.post(API.RESET_PASSWORD, payload, {
      params: {
        token,
      },
    });
  },
  verifyEmail(token) {
    return axios.post(API.VERIFY_EMAIL, null, {
      params: {
        token,
      },
    });
  },
  sendVerificationEmail() {
    return axios.post(API.SEND_VERIFICATION_EMAIL);
  },
};

export default AuthAPI;
