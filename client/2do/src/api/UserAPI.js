import axios from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const UserAPI = {
  myProfile() {
    return axios.get(API.MY_PROFILE);
  },
  updateMyProfile(payload) {
    return axios.post(API.UPDATE_MY_PROFILE, payload);
  },
};

export default UserAPI;
