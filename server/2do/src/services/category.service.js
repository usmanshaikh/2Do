const httpStatus = require('http-status');
const { Category, Task, Checklist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create default Category after register
 */
const createDefaultCategoryAfterRegister = async (user) => {
  const categoryBody = {
    categoryName: 'Personal',
    cardColor: '62de37a63393341df05a24a4', // App Main Color
    createdBy: user._id,
    deletable: false,
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
 * Get all Categories
 */
const allCategories = async (req) => {
  const query = {
    createdBy: req.user._id,
  };
  let removedField = [];
  if (req.query.onlyCategories) {
    removedField.push('-cardColor', '-deletable', '-createdBy');
  }
  const categories = await Category.find(query).populate(['cardColor']).select(removedField);
  return categories;
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
      $lookup: {
        from: 'cardcolors',
        localField: 'cardColor',
        foreignField: '_id',
        as: 'cardcolorData',
      },
    },
    {
      $group: {
        _id: '$_id',
        categoryName: { $first: '$categoryName' },
        cardColor: { $first: { $arrayElemAt: ['$cardcolorData.color', 0] } },
        deletable: { $first: { $ifNull: ['$deletable', false] } },
        taskData: { $first: '$taskData' },
        checklistData: { $first: '$checklistData' },
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        categoryName: 1,
        cardColor: 1,
        deletable: 1,
        taskCount: { $cond: { if: { $isArray: '$taskData' }, then: { $size: '$taskData' }, else: 'NA' } },
        checklistCount: { $cond: { if: { $isArray: '$checklistData' }, then: { $size: '$checklistData' }, else: 'NA' } },
      },
    },
  ]);
  return groupData;
};

// const categoryWithTaskAndChecklistCount = async (req) => {
//   let groupData = await Category.aggregate([
//     {
//       $match: {
//         createdBy: req.user._id,
//       },
//     },
//     {
//       $lookup: {
//         from: 'tasks',
//         localField: '_id',
//         foreignField: 'category',
//         as: 'taskData',
//       },
//     },
//     {
//       $lookup: {
//         from: 'checklists',
//         localField: '_id',
//         foreignField: 'category',
//         as: 'checklistData',
//       },
//     },
//     {
//       $facet: {
//         checklistArray: [
//           { $unwind: '$checklistData' },
//           {
//             $lookup: {
//               from: 'categories',
//               localField: 'checklistData.category',
//               foreignField: '_id',
//               as: 'categoryData',
//             },
//           },
//           {
//             $group: {
//               _id: '$checklistData.category',
//               categoryName: { $first: { $arrayElemAt: ['$categoryData.categoryName', 0] } },
//               checklistCount: { $sum: 1 },
//             },
//           },
//         ],
//         taskArray: [
//           { $unwind: '$taskData' },
//           {
//             $lookup: {
//               from: 'categories',
//               localField: 'taskData.category',
//               foreignField: '_id',
//               as: 'categoryData',
//             },
//           },
//           {
//             $group: {
//               _id: '$taskData.category',
//               categoryName: { $first: { $arrayElemAt: ['$categoryData.categoryName', 0] } },
//               taskCount: { $sum: 1 },
//             },
//           },
//         ],
//       },
//     },
//     {
//       $project: {
//         combine: {
//           $concatArrays: ['$checklistArray', '$taskArray'],
//         },
//       },
//     },
//     {
//       $unwind: '$combine',
//     },
//     {
//       $group: {
//         _id: '$combine._id',
//         categoryName: { $first: '$combine.categoryName' },
//         checklistCount: {
//           $sum: '$combine.checklistCount',
//         },
//         taskCount: {
//           $sum: '$combine.taskCount',
//         },
//       },
//     },
//   ]);
//   return groupData;
// };

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
  const tasks = await Task.find({ category: req.params.categoryId });
  if (tasks.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Category contain Tasks. Please move Tasks to another category to delete this category.'
    );
  }

  const checklists = await Checklist.find({ category: req.params.categoryId });
  if (checklists.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Category contain Checklists. Please move Checklists to another category to delete this category.'
    );
  }

  const query = {
    _id: req.params.categoryId,
    createdBy: req.user._id,
    deletable: true,
  };
  const category = await Category.findOneAndDelete(query);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * To check if Category ID exits. This function used in isDocIdExits Middlewares.
 */
const isCategoryExits = async (req) => {
  const query = {
    _id: req.body.category,
    createdBy: req.user._id,
  };
  const category = await Category.findOne(query);
  return category;
};

/**
 * To check if Category name already exits or not. This function used in isDocIdExits Middlewares.
 */
const isCategoryNameAlreadyExits = async (req) => {
  const categoryName = req.body.categoryName;
  const query = {
    categoryName: { $regex: new RegExp(categoryName, 'i') },
    createdBy: req.user._id,
  };
  const category = await Category.findOne(query);
  return category;
};

module.exports = {
  createCategory,
  allCategories,
  isCategoryExits,
  isCategoryNameAlreadyExits,
  updateCategoryById,
  deleteCategoryById,
  categoryWithTaskAndChecklistCount,
  createDefaultCategoryAfterRegister,
};
