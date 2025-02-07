import { axios, NO_LOADER } from "../../hooks/useAxiosInterceptor";
import { API } from "../../utils/constants";
import {
  CategoryResponse,
  CategoriesWithTaskAndChecklistCount,
  CategoryPayload,
  UpdateCategoryPayload,
  ApiResponse,
  BasicResponse,
} from "../types";

const categoryApi = {
  allCategoriesForModal(onlyCategories: boolean = false) {
    return axios.get<ApiResponse<CategoryResponse[]>>(API.CATEGORY.ALL, {
      params: { onlyCategories: onlyCategories },
      ...NO_LOADER,
    });
  },
  allCategories(onlyCategories: boolean = false) {
    return axios.get<ApiResponse<CategoryResponse[]>>(API.CATEGORY.ALL, {
      params: { onlyCategories: onlyCategories },
      ...NO_LOADER,
    });
  },
  categoryWithCount() {
    return axios.get<ApiResponse<CategoriesWithTaskAndChecklistCount[]>>(
      API.CATEGORY.WITH_TASK_AND_CHECKLIST_COUNT,
      NO_LOADER
    );
  },
  createCategory(payload: CategoryPayload) {
    return axios.post<ApiResponse<CategoryResponse>>(API.CATEGORY.CREATE, payload, NO_LOADER);
  },
  deleteCategory(checklistId: string) {
    return axios.delete<BasicResponse>(`${API.CATEGORY.CATEGORIES}/${checklistId}`, NO_LOADER);
  },
  updateCategory(payload: UpdateCategoryPayload) {
    const { _id, ...payloadWithoutId } = payload;
    return axios.patch<ApiResponse<CategoryResponse>>(`${API.CATEGORY.CATEGORIES}/${_id}`, payloadWithoutId, NO_LOADER);
  },
};

export default categoryApi;
