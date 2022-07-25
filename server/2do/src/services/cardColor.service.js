const { CardColor } = require('../models');

/**
 * Create a cardColor
 * @param {Object} cardColorBody
 * @returns {Promise<CardColor>}
 */
const createCardColor = async (cardColorBody) => {
  return CardColor.create(cardColorBody);
};

/**
 * Get all cardColor
 * @returns {Promise<CardColor>}
 */
const getAllCardColor = async () => {
  const cardColor = await CardColor.find();
  return cardColor;
};

/**
 * Get cardColor by id
 * @param {ObjectId} id
 * @returns {Promise<CardColor>}
 */
const getCardColorById = async (id) => {
  return CardColor.findById(id);
};

module.exports = {
  createCardColor,
  getAllCardColor,
  getCardColorById,
};
