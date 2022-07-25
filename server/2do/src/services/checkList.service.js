const httpStatus = require('http-status');
const { CheckList } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a checkList
 * @param {Object} checkListBody
 * @returns {Promise<CheckList>}
 */
const createCheckList = async (checkListBody) => {
  return CheckList.create(checkListBody);
};

/**
 * Get all checkList
 * @returns {Promise<CheckList>}
 */
const getAllCheckLists = async () => {
  const checkLists = await CheckList.find();
  return checkLists;
};

/**
 * Get checkList by id
 * @param {ObjectId} id
 * @returns {Promise<CheckList>}
 */
const getCheckListById = async (id) => {
  return CheckList.findById(id);
};

/**
 * Update checkList by id
 * @param {ObjectId} checkListId
 * @param {Object} updateBody
 * @returns {Promise<CheckList>}
 */
const updateCheckListById = async (checkListId, updateBody) => {
  const checkList = await getCheckListById(checkListId);
  if (!checkList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CheckList not found');
  }
  Object.assign(checkList, updateBody);
  await checkList.save();
  return checkList;
};

/**
 * Delete checkList by id
 * @param {ObjectId} checkListId
 * @returns {Promise<CheckList>}
 */
const deleteCheckListById = async (checkListId) => {
  const checkList = await getCheckListById(checkListId);
  if (!checkList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CheckList not found');
  }
  await checkList.remove();
  return checkList;
};

module.exports = {
  createCheckList,
  getAllCheckLists,
  getCheckListById,
  updateCheckListById,
  deleteCheckListById,
};
