import { axiosInstance as axios, NO_LOADER } from "./Axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const TaskAPI = {
  allTasks(payload) {
    return axios.post(API.TASK.ALL, payload, NO_LOADER);
  },
  changeTaskStatus(payload, taskId) {
    return axios.patch(`${API.TASK.CHANGE_STATUS}/${taskId}`, payload, NO_LOADER);
  },
  getTask(taskId) {
    return axios.get(`${API.TASK.TASK}/${taskId}`, NO_LOADER);
  },
  createTask(payload) {
    return axios.post(`${API.TASK.CREATE}`, payload, NO_LOADER);
  },
  deleteTask(taskId) {
    return axios.delete(`${API.TASK.TASK}/${taskId}`, NO_LOADER);
  },
  updateTask(payload, taskId) {
    return axios.patch(`${API.TASK.TASK}/${taskId}`, payload, NO_LOADER);
  },
};

export default TaskAPI;
