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
 * Get category with task & checkList counts
 */
const categoryWithTaskAndCheckListCount = async () => {
  let groupData = await Category.aggregate([
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'category',
        as: 'taskData',
      },
    },
    {
      $lookup: {
        from: 'checklists',
        localField: '_id',
        foreignField: 'category',
        as: 'checkListData',
      },
    },
    {
      $facet: {
        checkListArray: [
          { $unwind: '$checkListData' },
          {
            $lookup: {
              from: 'categories',
              localField: 'checkListData.category',
              foreignField: '_id',
              as: 'categoryData',
            },
          },
          {
            $group: {
              _id: '$checkListData.category',
              categoryName: { $first: { $arrayElemAt: ['$categoryData.categoryName', 0] } },
              checkListCount: { $sum: 1 },
            },
          },
        ],
        taskArray: [
          { $unwind: '$taskData' },
          {
            $lookup: {
              from: 'categories',
              localField: 'taskData.category',
              foreignField: '_id',
              as: 'categoryData',
            },
          },
          {
            $group: {
              _id: '$taskData.category',
              categoryName: { $first: { $arrayElemAt: ['$categoryData.categoryName', 0] } },
              taskCount: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        combine: {
          $concatArrays: ['$checkListArray', '$taskArray'],
        },
      },
    },
    {
      $unwind: '$combine',
    },
    {
      $group: {
        _id: '$combine._id',
        categoryName: { $first: '$combine.categoryName' },
        checkListCount: {
          $sum: '$combine.checkListCount',
        },
        taskCount: {
          $sum: '$combine.taskCount',
        },
      },
    },
  ]);
  return groupData;
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
