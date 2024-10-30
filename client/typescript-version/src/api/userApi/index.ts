import { axios } from "../../hooks/useAxiosInterceptor";
import { StatisticReportResponse, UserResponse } from "../types";
import { API } from "../../utils/constants";

const userApi = {
  myProfile() {
    return axios.get<UserResponse>(API.USER.MY_PROFILE);
  },
  updateMyProfile(payload: FormData) {
    return axios.post<UserResponse>(API.USER.UPDATE_MY_PROFILE, payload);
  },
  statisticReport() {
    return axios.get<StatisticReportResponse>(API.USER.STATISTIC_REPORT);
  },
};

export default userApi;
