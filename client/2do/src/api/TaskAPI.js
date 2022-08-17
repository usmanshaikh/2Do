import axios from "./axios";

const PATH = "tasks";

const TaskAPI = {
  allTasks(payload) {
    return axios.post(`${PATH}/allTasks`, payload);
  },
};

export default TaskAPI;
