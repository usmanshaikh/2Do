import axios, { NO_LOADER } from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const ChecklistAPI = {
  allChecklists(payload) {
    return axios.post(API.CHECKLIST.ALL, payload);
  },
  changeTaskStatus(payload, checklistsId) {
    return axios.patch(`${API.CHECKLIST.CHANGE_STATUS}/${checklistsId}`, payload, NO_LOADER);
  },
  getTask(checklistsId) {
    return axios.get(`${API.CHECKLIST.CHECKLIST}/${checklistsId}`);
  },
  createTask(payload) {
    return axios.post(`${API.CHECKLIST.CREATE}`, payload);
  },
  deleteTask(checklistsId) {
    return axios.delete(`${API.CHECKLIST.CHECKLIST}/${checklistsId}`);
  },
  updateTask(payload, checklistsId) {
    return axios.patch(`${API.CHECKLIST.CHECKLIST}/${checklistsId}`, payload);
  },
};

export default ChecklistAPI;
