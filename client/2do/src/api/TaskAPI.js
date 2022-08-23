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
  deleteTask(taskId) {
    return axios.delete(`${API.DELETE_TASK}/${taskId}`);
  },
};

export default TaskAPI;
