import axios from "./axios";
import * as Auth from "../utils/constants/apiPath.constants";

const AuthAPI = {
  register(payload) {
    return axios.post(Auth.REGISTER, payload);
  },
  login(payload) {
    return axios.post(Auth.LOGIN, payload);
  },
  forgotPassword(payload) {
    return axios.post(Auth.FORGOT_PASSWORD, payload);
  },
  logout(payload) {
    return axios.post(Auth.LOGOUT, payload);
  },
  refreshTokens(payload) {
    return axios.post(Auth.REFRESH_TOKENS, payload);
  },
  resetPassword(payload, token) {
    return axios.post(Auth.RESET_PASSWORD, payload, {
      params: {
        token,
      },
    });
  },
  verifyEmail(token) {
    return axios.post(Auth.VERIFY_EMAIL, null, {
      params: {
        token,
      },
    });
  },
  sendVerificationEmail() {
    return axios.post(Auth.SEND_VERIFICATION_EMAIL);
  },
};

export default AuthAPI;
