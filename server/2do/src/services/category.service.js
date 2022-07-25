const httpStatus = require('http-status');
const cardColorService = require('./cardColor.service');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  const cardColor = await cardColorService.getCardColorById(categoryBody.cardColor);
  if (!cardColor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cardColor not found or Invalid cardColor id');
  }
  return Category.create(categoryBody);
};

/**
 * Get all category
 * @returns {Promise<Category>}
 */
const getAllCategory = async () => {
  const category = await Category.find();
  return category;
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  return Category.findById(id);
};

module.exports = {
  createCategory,
  getAllCategory,
  updateCategoryById,
  deleteCategoryById,
};
