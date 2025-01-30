import httpStatus from 'http-status';
import moment from 'moment';
import { Checklist } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

/**
 * Create a Checklist
 */
export const createChecklist = async (req, checklistBody) => {
  checklistBody.createdBy = res.locals.user._id;
  let checklists = await Checklist.create(checklistBody);
  const populateQuery = [{ path: 'category', select: 'id categoryName' }];
  checklists = await checklists.populate(populateQuery);
  return checklists;
};

/**
 * Get Checklist by ID
 */
export const getChecklistById = async (req) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user._id,
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
export const updateChecklistById = async (req, updateBody) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user._id,
  };
  const checklists = await Checklist.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!checklists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklists;
};

/**
 * Delete Checklist by ID
 */
export const deleteChecklistById = async (req) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user._id,
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
export const changeChecklistStatus = async (req, updateBody) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user._id,
  };
  const checklist = await Checklist.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklist;
};

/**
 * All checklist with filter query (category, isCompleted, dateAndTime)
 */
export const allChecklists = async (req) => {
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
  query.createdBy = res.locals.user._id;
  const checklist = await Checklist.find(query);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, something went wrong. Please try again.');
  }
  return checklist;
};

/**
 * Get Checklist by ID only
 */
export const getChecklistByIdOnly = async (checklistId) => {
  const checklist = await Checklist.findById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  return checklist;
};

export default {
  createChecklist,
  getChecklistById,
  updateChecklistById,
  deleteChecklistById,
  changeChecklistStatus,
  allChecklists,
  getChecklistByIdOnly,
};
