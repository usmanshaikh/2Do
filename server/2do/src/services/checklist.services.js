const httpStatus = require('http-status');
const moment = require('moment');
const { Checklist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Checklist
 */
const createChecklist = async (req, checklistBody) => {
  checklistBody.createdBy = req.user._id;
  let checklists = await Checklist.create(checklistBody);
  const populateQuery = [{ path: 'category', select: 'id categoryName' }, { path: 'cardColor' }];
  checklists = await checklists.populate(populateQuery).execPopulate();
  return checklists;
};

/**
 * Get Checklist by ID
 */
const getChecklistById = async (req) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: req.user._id,
  };
  const checklists = await Checklist.findOne(query);
  if (!checklists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklists;
};

/**
 * Update Checklist by ID
 */
const updateChecklistById = async (req, updateBody) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: req.user._id,
  };
  const checklists = await Checklist.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!checklists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklists;
};

/**
 * Delete Checklist by ID
 */
const deleteChecklistById = async (req) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: req.user._id,
  };
  const checklists = await Checklist.findOneAndDelete(query);
  if (!checklists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklists;
};

/**
 * Change Checklist status by ID
 */
const changeChecklistStatus = async (req, updateBody) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: req.user._id,
  };
  const checklist = await Checklist.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklist;
};

/**
 * All checklist with filter query (category, isCompleted, dateAndTime)
 */
const allChecklists = async (req) => {
  const query = req.body;
  if (query.dateAndTime) {
    const dt = query.dateAndTime;
    const startOfDay = moment(dt).startOf('day').format();
    const endOfDay = moment(dt).endOf('day').format();
    query.dateAndTime = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }
  query.createdBy = req.user._id;
  const checklist = await Checklist.find(query);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, something went wrong. Please try again.');
  }
  return checklist;
};

/**
 * Get Checklist by ID only
 */
const getChecklistByIdOnly = async (checklistId) => {
  const checklist = await Checklist.findById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklist;
};

module.exports = {
  createChecklist,
  getChecklistById,
  updateChecklistById,
  deleteChecklistById,
  changeChecklistStatus,
  allChecklists,
  getChecklistByIdOnly,
};
