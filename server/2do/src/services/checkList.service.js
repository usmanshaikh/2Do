const httpStatus = require('http-status');
const { Checklist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a checklist
 * @param {Object} checklistBody
 * @returns {Promise<Checklist>}
 */
const createChecklist = async (checklistBody) => {
  let checklists = await Checklist.create(checklistBody);
  checklists = await checklists.populate(['category', 'cardColor']).execPopulate();
  return checklists;
};

/**
 * Get all checklist
 * @returns {Promise<Checklist>}
 */
const getAllChecklists = async (query) => {
  const checklists = await Checklist.find(query);
  if (!checklists || !checklists.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No data found');
  }
  return checklists;
};

/**
 * Get checklist by id
 * @param {ObjectId} id
 * @returns {Promise<Checklist>}
 */
const getChecklistById = async (id) => {
  return Checklist.findById(id);
};

/**
 * Update checklist by id
 * @param {ObjectId} checklistId
 * @param {Object} updateBody
 * @returns {Promise<Checklist>}
 */
const updateChecklistById = async (checklistId, updateBody) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  Object.assign(checklist, updateBody);
  await checklist.save();
  return checklist;
};

/**
 * Delete checklist by id
 * @param {ObjectId} checklistId
 * @returns {Promise<Checklist>}
 */
const deleteChecklistById = async (checklistId) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  await checklist.remove();
  return checklist;
};

/**
 * Delete all checklist
 * @returns {Promise<Checklist>}
 */
const deleteAllChecklist = async () => {
  const checklist = await Checklist.deleteMany({});
  return checklist;
};

/**
 * Change checklist Status by id
 * @param {ObjectId} checklistId
 * @param {Object} updateBody
 * @returns {Promise<Checklist>}
 */
const changeChecklistStatus = async (checklistId, updateBody) => {
  const checklist = await Checklist.findByIdAndUpdate(
    checklistId,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklist;
};

module.exports = {
  createChecklist,
  getAllChecklists,
  getChecklistById,
  updateChecklistById,
  deleteChecklistById,
  deleteAllChecklist,
  changeChecklistStatus,
};
