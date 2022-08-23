import axios from "./axios";
import constants from "../utils/constants";

const API = constants.apiPath;

const CardColorAPI = {
  cardColors() {
    return axios.get(API.CARD_COLORS);
  },
};

export default CardColorAPI;
