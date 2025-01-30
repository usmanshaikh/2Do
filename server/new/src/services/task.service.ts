import httpStatus from 'http-status';
import moment from 'moment';
import { Task } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

/**
 * Create a Task
 */
export const createTask = async (req, taskBody) => {
  taskBody.createdBy = res.locals.user._id;
  let task = await Task.create(taskBody);
  const populateQuery = [{ path: 'category', select: 'id categoryName' }];
  task = await task.populate(populateQuery);
  return task;
};

/**
 * Get Task by ID
 */
export const getTaskById = async (req) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user._id,
  };
  const tasks = await Task.findOne(query);
  if (!tasks) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return tasks;
};

/**
 * Update Task by ID
 */
export const updateTaskById = async (req, updateBody) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user._id,
  };
  const task = await Task.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * Delete Task by ID
 */
export const deleteTaskById = async (req) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user._id,
  };
  const task = await Task.findOneAndDelete(query);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * Change Task status by ID
 */
export const changeTaskStatus = async (req, updateBody) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user._id,
  };
  const task = await Task.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * Get all Task with filter query (category, isCompleted, dateAndTime)
 */
export const allTasks = async (req) => {
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
  const tasks = await Task.find(query);
  if (!tasks) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, something went wrong. Please try again.');
  }
  return tasks;
};

/**
 * Get Task by ID only
 */
export const getTaskByIdOnly = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

export default {
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  changeTaskStatus,
  allTasks,
  getTaskByIdOnly,
};
