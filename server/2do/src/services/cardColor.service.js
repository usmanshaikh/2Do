import { CardColor } from '../models/index.js';

/**
 * Create a CardColor
 */
const createCardColor = async (cardColorBody) => {
  return CardColor.create(cardColorBody);
};

/**
 * Get all CardColors
 */
const getAllCardColors = async () => {
  const cardColors = await CardColor.find();
  return cardColors;
};

/**
 * Get CardColor by ID. This function used in isDocIdExits Middlewares.
 */
const getCardColorById = async (id) => {
  return CardColor.findById(id);
};

export default {
  createCardColor,
  getAllCardColors,
  getCardColorById,
};
