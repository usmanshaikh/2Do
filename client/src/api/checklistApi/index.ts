import { axios, NO_LOADER } from "../../hooks/useAxiosInterceptor";
import { API } from "../../utils/constants";
import {
  NoContentResponse,
  ChecklistResponse,
  ChecklistAllPayload,
  UpdateChecklistStatusPayload,
  CreateChecklistPayload,
  UpdateChecklistPayload,
} from "../types";

const checklistApi = {
  allChecklists(payload: ChecklistAllPayload) {
    return axios.post<ChecklistResponse[]>(API.CHECKLIST.ALL, payload, NO_LOADER);
  },
  changeChecklistStatus(payload: UpdateChecklistStatusPayload) {
    const { id, ...payloadWithoutId } = payload;
    return axios.patch<ChecklistResponse>(`${API.CHECKLIST.CHANGE_STATUS}/${id}`, payloadWithoutId, NO_LOADER);
  },
  getChecklist(checklistId: string) {
    return axios.get<ChecklistResponse>(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, NO_LOADER);
  },
  createChecklist(payload: CreateChecklistPayload) {
    return axios.post<ChecklistResponse>(`${API.CHECKLIST.CREATE}`, payload, NO_LOADER);
  },
  deleteChecklist(checklistId: string) {
    return axios.delete<NoContentResponse>(`${API.CHECKLIST.CHECKLIST}/${checklistId}`, NO_LOADER);
  },
  updateChecklist(payload: UpdateChecklistPayload) {
    const { id, ...payloadWithoutId } = payload;
    return axios.patch<ChecklistResponse>(`${API.CHECKLIST.CHECKLIST}/${id}`, payloadWithoutId, NO_LOADER);
  },
};

export default checklistApi;
