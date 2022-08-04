const { CardColor } = require('../models');

/**
 * Create a CardColor
 */
const createCardColor = async (cardColorBody) => {
  return CardColor.create(cardColorBody);
};

/**
 * Get all CardColor
 */
const getAllCardColor = async () => {
  const cardColor = await CardColor.find();
  return cardColor;
};

/**
 * Get CardColor by ID
 */
const getCardColorById = async (id) => {
  return CardColor.findById(id);
};

module.exports = {
  createCardColor,
  getAllCardColor,
  getCardColorById,
};
