import axios from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const CategoryAPI = {
  allCategories() {
    return axios.get(API.ALL_CATEGORIES, {
      params: {
        onlyCategories: true,
      },
    });
  },
};

export default CategoryAPI;
