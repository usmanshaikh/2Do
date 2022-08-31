import { axiosInstance as axios, NO_LOADER } from "./AxiosInterceptor";
import constants from "../utils/constants";

const API = constants.apiPath;

const TaskAPI = {
  allTasks(payload) {
    return axios.post(API.TASK.ALL, payload);
  },
  changeTaskStatus(payload, taskId) {
    return axios.patch(`${API.TASK.CHANGE_STATUS}/${taskId}`, payload, NO_LOADER);
  },
  getTask(taskId) {
    return axios.get(`${API.TASK.TASK}/${taskId}`);
  },
  createTask(payload) {
    return axios.post(`${API.TASK.CREATE}`, payload);
  },
  deleteTask(taskId) {
    return axios.delete(`${API.TASK.TASK}/${taskId}`);
  },
  updateTask(payload, taskId) {
    return axios.patch(`${API.TASK.TASK}/${taskId}`, payload);
  },
};

export default TaskAPI;
