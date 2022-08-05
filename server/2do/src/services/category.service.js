const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create default Category after register
 */
const createDefaultCategoryAfterRegister = async (user) => {
  const categoryBody = {
    categoryName: 'Personal',
    cardColor: '62de37803393341df05a2492',
    createdBy: user._id,
  };
  await Category.create(categoryBody);
};

/**
 * Create a Category
 */
const createCategory = async (req, categoryBody) => {
  categoryBody.createdBy = req.user._id;
  let category = await Category.create(categoryBody);
  category = await category.populate(['cardColor']).execPopulate();
  return category;
};

/**
 * Get all Category
 */
const getAllCategory = async (req) => {
  const query = {
    createdBy: req.user._id,
  };
  let removedField = [];
  if (req.query.onlyCategories) {
    removedField.push('-cardColor');
  }
  const category = await Category.find(query).populate(['cardColor']).select(removedField);
  return category;
};

/**
 * Get Category with task & checklist counts
 */
const categoryWithTaskAndChecklistCount = async (req) => {
  let groupData = await Category.aggregate([
    {
      $match: {
        createdBy: req.user._id,
      },
    },
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
        as: 'checklistData',
      },
    },
    {
      $facet: {
        checklistArray: [
          { $unwind: '$checklistData' },
          {
            $lookup: {
              from: 'categories',
              localField: 'checklistData.category',
              foreignField: '_id',
              as: 'categoryData',
            },
          },
          {
            $group: {
              _id: '$checklistData.category',
              categoryName: { $first: { $arrayElemAt: ['$categoryData.categoryName', 0] } },
              checklistCount: { $sum: 1 },
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
          $concatArrays: ['$checklistArray', '$taskArray'],
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
        checklistCount: {
          $sum: '$combine.checklistCount',
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
 * Update Category by ID
 */
const updateCategoryById = async (req, updateBody) => {
  const query = {
    _id: req.params.categoryId,
    createdBy: req.user._id,
  };
  const category = await Category.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * Delete Category by ID
 */
const deleteCategoryById = async (req) => {
  const query = {
    _id: req.params.categoryId,
    createdBy: req.user._id,
  };
  const category = await Category.findOneAndDelete(query);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * To check if Category ID exits
 */
const isCategoryExits = async (req) => {
  const query = {
    _id: req.body.category,
    createdBy: req.user._id,
  };
  const category = await Category.findOne(query);
  return category;
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Delete all Category
 */
const deleteAllCategory = async () => {
  const category = await Category.deleteMany({});
  return category;
};

module.exports = {
  createCategory,
  getAllCategory,
  isCategoryExits,
  updateCategoryById,
  deleteCategoryById,
  deleteAllCategory,
  categoryWithTaskAndChecklistCount,
  createDefaultCategoryAfterRegister,
};
