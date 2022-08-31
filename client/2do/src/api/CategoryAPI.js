import { axiosInstance as axios, NO_LOADER } from "./AxiosInterceptor";
import constants from "../utils/constants";

const API = constants.apiPath;

const CategoryAPI = {
  allCategoriesForModal(onlyCategories = false) {
    return axios.get(API.CATEGORY.ALL, {
      params: {
        onlyCategories: onlyCategories,
      },
      ...NO_LOADER,
    });
  },
  allCategories(onlyCategories = false) {
    return axios.get(API.CATEGORY.ALL, {
      params: {
        onlyCategories: onlyCategories,
      },
    });
  },
  categoryWithCount() {
    return axios.get(API.CATEGORY.WITH_TASK_AND_CHECKLIST_COUNT);
  },
  createCategory(payload) {
    return axios.post(API.CATEGORY.CREATE, payload);
  },
  deleteCategory(checklistId) {
    return axios.delete(`${API.CATEGORY.CATEGORIES}/${checklistId}`);
  },
  updateCategory(payload, checklistId) {
    return axios.patch(`${API.CATEGORY.CATEGORIES}/${checklistId}`, payload);
  },
};

export default CategoryAPI;
