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
        checkList: [
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
              name: { $first: { $arrayElemAt: ['$categoryData.categoryName', 0] } },
              checkListCount: { $sum: 1 },
            },
          },
        ],
        task: [
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
              name: { $first: { $arrayElemAt: ['$categoryData.categoryName', 0] } },
              taskCount: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        combine: {
          $concatArrays: ['$checkList', '$task'],
        },
      },
    },
    {
      $unwind: '$combine',
    },
    {
      $group: {
        _id: '$combine._id',
        categoryName: { $first: '$combine.name' },
        checkListCount: {
          $sum: '$combine.checkListCount',
        },
        taskCount: {
          $sum: '$combine.taskCount',
        },
      },
    },
    // { $project: { activity: { $setUnion: ['$checkList', '$task'] } } },
    // { $unwind: '$activity' },
    // { $replaceRoot: { newRoot: '$activity' } },
    // {
    //   $addFields: {
    //     N: {
    //       $reduce: {
    //         input: { $concatArrays: ['$avg_competences', '$avg_subcompetences'] },
    //         initialValue: 0,
    //         in: { $sum: ['$$value', '$$this.count'] },
    //       },
    //     },
    //   },
    // },

    // { $unwind: { path: '$taskData', includeArrayIndex: 'index1' } },
    // { $unwind: { path: '$checkListData', includeArrayIndex: 'index2' } },
    // {
    //   $project: {
    //     taskData: 1,
    //     categoryName: 1,
    //     checkListData: 1,
    //     compare: {
    //       $cmp: ['$index1', '$index2'],
    //     },
    //   },
    // },
    // {
    //   $match: {
    //     compare: 0,
    //   },
    // },
    // {
    //   $project: {
    //     _id: 1,
    //     categoryName: 1,
    //     taskData: 1,
    //     checkListData: 1,
    //   },
    // },
    // {
    //   $group: {
    //     _id: '$checkListData.category',
    //     categoryName: { $first: '$categoryName' },
    //     taskCount: {
    //       $sum: {
    //         $cond: ['$taskData.category', 1, 0],
    //       },
    //     },
    //     checkListCount: {
    //       $sum: {
    //         $cond: ['$checkListData.category', 1, 0],
    //       },
    //     },
    //   },
    // },
  ]);
  return groupData;
};
// const categoryWithTaskAndCheckListCount = async () => {
//   let grpTask = await Task.aggregate([
//     {
//       $lookup: {
//         from: 'categories',
//         localField: 'category',
//         foreignField: '_id',
//         as: 'categoryVar',
//       },
//     },
//     {
//       $lookup: {
//         from: 'checklists',
//         pipeline: [{ $match: { $expr: [{ category: { $toObjectId: { $arrayElemAt: ['$categoryVar._id', 0] } } }] } }],
//         as: 'checkListVar',
//       },
//     },
//     {
//       $lookup: {
//         from: 'categories',
//         localField: 'checkListVar.category',
//         foreignField: '_id',
//         as: 'categoryVar2',
//       },
//     },
//     { $unwind: '$categoryVar' },
//     { $unwind: '$categoryVar2' },
//     {
//       $addFields: {
//         // categoryName: { $arrayElemAt: ['$categoryVar.categoryName', 0] },
//         // categoryId: { $arrayElemAt: ['$categoryVar._id', 0] },
//         // checkListId: { $arrayElemAt: ['$categoryVar2._id', 0] },
//       },
//     },
//     // {
//     //   $group: {
//     //     _id: '$_id',
//     //     categoryName: { $first: '$categoryVar.categoryName' },
//     //     taskCount: { $sum: 1 },
//     //   },
//     // },
//     // {
//     //   $group: {
//     //     _id: '$categoryVar2._id',
//     //     checkListCount: {
//     //       $sum: {
//     //         $cond: ['$categoryVar2._id', 1, 0],
//     //       },
//     //     },
//     //     categoryName: { $first: '$categoryName' },
//     //     taskCount: { $first: '$taskCount' },
//     //   },
//     // },
//   ]);
//   return grpTask;
// };

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
