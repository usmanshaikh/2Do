import { axios } from "../../hooks/useAxiosInterceptor";
import { ApiResponse, StatisticReportResponse, UpdateUserPayload, UserResponse } from "../types";
import { API } from "../../utils/constants";

const userApi = {
  myProfile() {
    return axios.get<ApiResponse<UserResponse>>(API.USER.USER);
  },
  updateMyProfile(payload: UpdateUserPayload) {
    return axios.patch<ApiResponse<UserResponse>>(API.USER.USER, payload);
  },
  statisticReport() {
    return axios.get<ApiResponse<StatisticReportResponse>>(API.USER.STATISTIC_REPORT);
  },
};

export default userApi;
