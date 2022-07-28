const httpStatus = require('http-status');
const { Category, Task, CheckList } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  let category = await Category.create(categoryBody);
  category = await category.populate(['cardColor']).execPopulate();
  return category;
};

/**
 * Get all category
 * @returns {Promise<Category>}
 */
const getAllCategory = async (query) => {
  let removedField = [];
  if (query.onlyCategories) {
    removedField.push('-cardColor');
  }
  const category = await Category.find().select(removedField);
  return category;
};

/**
 * Get all category with task & checkList count
 */
const categoryWithTaskAndCheckListCount = async () => {
  let grpTask = await Task.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryVar',
      },
    },
    {
      $lookup: {
        from: 'checklists',
        localField: 'checkList',
        foreignField: '_id',
        as: 'checkListVar',
      },
    },
    {
      $addFields: {
        categoryName: { $arrayElemAt: ['$categoryVar.categoryName', 0] },
        categoryId: { $arrayElemAt: ['$categoryVar._id', 0] },
      },
    },
    {
      $group: {
        _id: '$categoryId',
        categoryName: { $first: '$categoryName' },
        taskCount: { $sum: 1 },
      },
    },
  ]);
  return grpTask;
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

/**
 * Delete all category
 * @returns {Promise<Category>}
 */
const deleteAllCategory = async () => {
  const category = await Category.deleteMany({});
  return category;
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  deleteAllCategory,
  categoryWithTaskAndCheckListCount,
};
