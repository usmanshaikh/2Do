import axios, { NO_LOADER } from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const CategoryAPI = {
  allCategoriesForModal() {
    return axios.get(API.ALL_CATEGORIES, {
      params: {
        onlyCategories: true,
      },
      ...NO_LOADER,
    });
  },
  allCategories() {
    return axios.get(API.ALL_CATEGORIES, {
      params: {
        onlyCategories: true,
      },
    });
  },
};

export default CategoryAPI;
