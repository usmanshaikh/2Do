import { axios, NO_LOADER } from "../../hooks/useAxiosInterceptor";
import { API } from "../../utils/constants";
import { NoContentResponse, TaskResponse } from "../types";
import { ChangeTaskStatusPayload, TaskAllPayload, CreateTaskPayload, UpdateTaskPayload } from "./types";

const taskApi = {
  allTasks(payload: TaskAllPayload) {
    return axios.post<TaskResponse[]>(API.TASK.ALL, payload, NO_LOADER);
  },
  changeTaskStatus({ id, ...data }: ChangeTaskStatusPayload) {
    return axios.patch<TaskResponse>(`${API.TASK.CHANGE_STATUS}/${id}`, data, NO_LOADER);
  },
  getTask(taskId: string) {
    return axios.get<TaskResponse>(`${API.TASK.TASK}/${taskId}`, NO_LOADER);
  },
  createTask(payload: CreateTaskPayload) {
    return axios.post<TaskResponse>(`${API.TASK.CREATE}`, payload, NO_LOADER);
  },
  deleteTask(taskId: string) {
    return axios.delete<NoContentResponse>(`${API.TASK.TASK}/${taskId}`, NO_LOADER);
  },
  updateTask({ id, ...data }: UpdateTaskPayload) {
    return axios.patch<TaskResponse>(`${API.TASK.TASK}/${id}`, data, NO_LOADER);
  },
};

export default taskApi;
