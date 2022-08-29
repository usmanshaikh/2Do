import axios, { NO_LOADER } from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const CategoryAPI = {
  allCategoriesForModal(onlyCategories = false) {
    return axios.get(API.CATEGORIES.ALL, {
      params: {
        onlyCategories: onlyCategories,
      },
      ...NO_LOADER,
    });
  },
  allCategories(onlyCategories = false) {
    return axios.get(API.CATEGORIES.ALL, {
      params: {
        onlyCategories: onlyCategories,
      },
    });
  },
  categoryWithCount() {
    return axios.get(API.CATEGORIES.WITH_TASK_AND_CHECKLIST_COUNT);
  },
  createCategory(payload) {
    return axios.post(API.CATEGORIES.CREATE, payload);
  },
  deleteCategory(checklistId) {
    return axios.delete(`${API.CATEGORIES.CATEGORIES}/${checklistId}`);
  },
  updateCategory(payload, checklistId) {
    return axios.patch(`${API.CATEGORIES.CATEGORIES}/${checklistId}`, payload);
  },
};

export default CategoryAPI;
