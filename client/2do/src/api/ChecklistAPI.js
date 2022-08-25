import axios, { NO_LOADER } from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const ChecklistAPI = {
  allChecklists(payload) {
    return axios.post(API.CHECKLIST.ALL, payload);
  },
  changeChecklistStatus(payload, checklistId) {
    return axios.patch(`${API.CHECKLIST.CHANGE_STATUS}/${checklistId}`, payload, NO_LOADER);
  },
  getChecklist(checklistId) {
    return axios.get(`${API.CHECKLIST.CHECKLIST}/${checklistId}`);
  },
  createChecklist(payload) {
    return axios.post(`${API.CHECKLIST.CREATE}`, payload);
  },
  deleteChecklist(checklistId) {
    return axios.delete(`${API.CHECKLIST.CHECKLIST}/${checklistId}`);
  },
  updateChecklist(payload, checklistId) {
    return axios.patch(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, payload);
  },
};

export default ChecklistAPI;
