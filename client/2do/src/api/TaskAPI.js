import axios, { NO_LOADER } from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const TaskAPI = {
  allTasks(payload) {
    return axios.post(API.ALL_TASKS, payload);
  },
  changeTaskStatus(payload, taskId) {
    return axios.patch(`${API.CHANGE_STATUS}/${taskId}`, payload, NO_LOADER);
  },
  getTask(taskId) {
    return axios.get(`${API.TASK}/${taskId}`);
  },
  createTask(payload) {
    return axios.post(`${API.CREATE}`, payload);
  },
  deleteTask(taskId) {
    return axios.delete(`${API.TASK}/${taskId}`);
  },
  updateTask(payload, taskId) {
    return axios.patch(`${API.TASK}/${taskId}`, payload);
  },
};

export default TaskAPI;
