import { axios, NO_LOADER } from '../../hooks/useAxiosInterceptor';
import { API } from '../../utils/constants';
import {
  LoginResponse,
  NoContentResponse,
  RefreshResponse,
  RegisterResponse,
  RegisterPayload,
  LoginPayload,
  ResetPasswordPayload,
  ApiResponse,
  BasicResponse,
} from '../types';

const authApi = {
  register(payload: RegisterPayload) {
    return axios.post<ApiResponse<RegisterResponse>>(API.AUTH.REGISTER, payload);
  },
  login(payload: LoginPayload) {
    return axios.post<ApiResponse<LoginResponse>>(API.AUTH.LOGIN, payload);
  },
  forgotPassword(payload: { email: string }) {
    return axios.post<BasicResponse>(API.AUTH.FORGOT_PASSWORD, payload);
  },
  resetPassword(payload: ResetPasswordPayload) {
    const { password, token } = payload;
    return axios.post<BasicResponse>(API.AUTH.RESET_PASSWORD, { password }, { params: { token } });
  },
  sendVerificationEmail() {
    return axios.post<BasicResponse>(API.AUTH.SEND_VERIFICATION_EMAIL);
  },
  verifyEmail(token: string) {
    return axios.post<BasicResponse>(API.AUTH.VERIFY_EMAIL, undefined, { params: { token } });
  },
  logout(payload: { refreshToken: string }) {
    return axios.post<BasicResponse>(API.AUTH.LOGOUT, payload);
  },
  refreshTokens(payload: { refreshToken: string }) {
    return axios.post<ApiResponse<RefreshResponse>>(API.AUTH.REFRESH_TOKENS, payload, NO_LOADER);
  },
};

export default authApi;
