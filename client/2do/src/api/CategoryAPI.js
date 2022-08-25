import axios, { NO_LOADER } from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const CategoryAPI = {
  allCategoriesForModal() {
    return axios.get(API.CATEGORIES.ALL, {
      params: {
        onlyCategories: true,
      },
      ...NO_LOADER,
    });
  },
  allCategories() {
    return axios.get(API.CATEGORIES.ALL, {
      params: {
        onlyCategories: true,
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
    return axios.delete(`${API.CATEGORIES.UPDATE_OR_DELETE}/${checklistId}`);
  },
  updateCategory(payload, checklistId) {
    return axios.patch(`${API.CATEGORIES.UPDATE_OR_DELETE}/${checklistId}`, payload);
  },
};

export default CategoryAPI;
