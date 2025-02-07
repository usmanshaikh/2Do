import { axios, NO_LOADER } from "../../hooks/useAxiosInterceptor";
import { API } from "../../utils/constants";
import {
  ChecklistResponse,
  ChecklistAllPayload,
  ChangeChecklistStatusPayload,
  CreateChecklistPayload,
  UpdateChecklistPayload,
  ApiResponse,
  BasicResponse,
} from "../types";

const checklistApi = {
  allChecklists(payload: ChecklistAllPayload) {
    return axios.post<ApiResponse<ChecklistResponse[]>>(API.CHECKLIST.ALL, payload, NO_LOADER);
  },
  changeChecklistStatus(payload: ChangeChecklistStatusPayload) {
    const { _id, ...payloadWithoutId } = payload;
    return axios.patch<ApiResponse<ChecklistResponse>>(`${API.CHECKLIST.CHANGE_STATUS}/${_id}`, payloadWithoutId, NO_LOADER);
  },
  getChecklist(checklistId: string) {
    return axios.get<ApiResponse<ChecklistResponse>>(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, NO_LOADER);
  },
  createChecklist(payload: CreateChecklistPayload) {
    return axios.post<ApiResponse<ChecklistResponse>>(`${API.CHECKLIST.CREATE}`, payload, NO_LOADER);
  },
  deleteChecklist(checklistId: string) {
    return axios.delete<BasicResponse>(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, NO_LOADER);
  },
  updateChecklist(payload: UpdateChecklistPayload) {
    const { _id, ...payloadWithoutId } = payload;
    return axios.patch<ApiResponse<ChecklistResponse>>(`${API.CHECKLIST.CHECKLIST}/${_id}`, payloadWithoutId, NO_LOADER);
  },
};

export default checklistApi;
