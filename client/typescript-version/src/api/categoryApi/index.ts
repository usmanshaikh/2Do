import { axios, NO_LOADER } from "../../hooks/useAxiosInterceptor";
import { API } from "../../utils/constants";
import { CategoryResponse, CategoriesWithTaskAndChecklistCount, NoContentResponse, CategoryPayload } from "../types";
import { UpdateCategoryPayload } from "./types";

const categoryApi = {
  allCategoriesForModal(onlyCategories: boolean = false) {
    return axios.get<CategoryResponse[]>(API.CATEGORY.ALL, {
      params: { onlyCategories: onlyCategories },
      ...NO_LOADER,
    });
  },
  allCategories(onlyCategories: boolean = false) {
    return axios.get<CategoryResponse[]>(API.CATEGORY.ALL, {
      params: {
        onlyCategories: onlyCategories,
      },
      ...NO_LOADER,
    });
  },
  categoryWithCount() {
    return axios.get<CategoriesWithTaskAndChecklistCount[]>(API.CATEGORY.WITH_TASK_AND_CHECKLIST_COUNT, NO_LOADER);
  },
  createCategory(payload: CategoryPayload) {
    return axios.post<CategoryResponse>(API.CATEGORY.CREATE, payload, NO_LOADER);
  },
  deleteCategory(checklistId: string) {
    return axios.delete<NoContentResponse>(`${API.CATEGORY.CATEGORIES}/${checklistId}`, NO_LOADER);
  },
  updateCategory(payload: UpdateCategoryPayload) {
    const { id, ...payloadWithoutId } = payload;
    return axios.patch<CategoryResponse>(`${API.CATEGORY.CATEGORIES}/${id}`, payloadWithoutId, NO_LOADER);
  },
};

export default categoryApi;
