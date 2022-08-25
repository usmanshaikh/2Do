import axios, { NO_LOADER } from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const CardColorAPI = {
  cardColors() {
    return axios.get(API.CARD_COLORS);
  },
  cardColorsForModal() {
    return axios.get(API.CARD_COLORS, NO_LOADER);
  },
};

export default CardColorAPI;
