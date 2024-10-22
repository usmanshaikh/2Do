import { axiosInstance as axios, NO_LOADER } from "./Axios";
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
      ...NO_LOADER,
    });
  },
  categoryWithCount() {
    return axios.get(API.CATEGORY.WITH_TASK_AND_CHECKLIST_COUNT, NO_LOADER);
  },
  createCategory(payload) {
    return axios.post(API.CATEGORY.CREATE, payload, NO_LOADER);
  },
  deleteCategory(checklistId) {
    return axios.delete(`${API.CATEGORY.CATEGORIES}/${checklistId}`, NO_LOADER);
  },
  updateCategory(payload, checklistId) {
    return axios.patch(`${API.CATEGORY.CATEGORIES}/${checklistId}`, payload, NO_LOADER);
  },
};

export default CategoryAPI;
