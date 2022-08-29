import axios from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const UserAPI = {
  myProfile() {
    return axios.get(API.USER.MY_PROFILE);
  },
  updateMyProfile(payload) {
    return axios.post(API.USER.UPDATE_MY_PROFILE, payload);
  },
  statisticReport() {
    return axios.get(API.USER.STATISTIC_REPORT);
  },
};

export default UserAPI;
