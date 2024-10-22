import { axiosInstance as axios, NO_LOADER } from "./Axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const ChecklistAPI = {
  allChecklists(payload) {
    return axios.post(API.CHECKLIST.ALL, payload, NO_LOADER);
  },
  changeChecklistStatus(payload, checklistId) {
    return axios.patch(`${API.CHECKLIST.CHANGE_STATUS}/${checklistId}`, payload, NO_LOADER);
  },
  getChecklist(checklistId) {
    return axios.get(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, NO_LOADER);
  },
  createChecklist(payload) {
    return axios.post(`${API.CHECKLIST.CREATE}`, payload, NO_LOADER);
  },
  deleteChecklist(checklistId) {
    return axios.delete(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, NO_LOADER);
  },
  updateChecklist(payload, checklistId) {
    return axios.patch(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, payload, NO_LOADER);
  },
};

export default ChecklistAPI;
