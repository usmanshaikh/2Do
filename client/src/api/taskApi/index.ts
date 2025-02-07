import { axios, NO_LOADER } from "../../hooks/useAxiosInterceptor";
import { API } from "../../utils/constants";
import { ApiResponse, BasicResponse, TaskResponse } from "../types";
import { ChangeTaskStatusPayload, TaskAllPayload, CreateTaskPayload, UpdateTaskPayload } from "./types";

const taskApi = {
  allTasks(payload: TaskAllPayload) {
    return axios.post<ApiResponse<TaskResponse[]>>(API.TASK.ALL, payload, NO_LOADER);
  },
  changeTaskStatus({ _id, ...data }: ChangeTaskStatusPayload) {
    return axios.patch<ApiResponse<TaskResponse>>(`${API.TASK.CHANGE_STATUS}/${_id}`, data, NO_LOADER);
  },
  getTask(taskId: string) {
    return axios.get<ApiResponse<TaskResponse>>(`${API.TASK.TASK}/${taskId}`, NO_LOADER);
  },
  createTask(payload: CreateTaskPayload) {
    return axios.post<ApiResponse<TaskResponse>>(`${API.TASK.CREATE}`, payload, NO_LOADER);
  },
  deleteTask(taskId: string) {
    return axios.delete<BasicResponse>(`${API.TASK.TASK}/${taskId}`, NO_LOADER);
  },
  updateTask({ _id, ...data }: UpdateTaskPayload) {
    return axios.patch<ApiResponse<TaskResponse>>(`${API.TASK.TASK}/${_id}`, data, NO_LOADER);
  },
};

export default taskApi;
