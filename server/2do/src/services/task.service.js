const httpStatus = require('http-status');
const moment = require('moment');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Task
 */
const createTask = async (req, taskBody) => {
  taskBody.createdBy = req.user._id;
  let task = await Task.create(taskBody);
  const populateQuery = [{ path: 'category', select: 'id categoryName' }, { path: 'cardColor' }];
  task = await task.populate(populateQuery).execPopulate();
  return task;
};

/**
 * Get Task by ID
 */
const getTaskById = async (req) => {
  const query = {
    _id: req.params.taskId,
    createdBy: req.user._id,
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
const updateTaskById = async (req, updateBody) => {
  const query = {
    _id: req.params.taskId,
    createdBy: req.user._id,
  };
  const task = await Task.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * Delete Task by ID
 */
const deleteTaskById = async (req) => {
  const query = {
    _id: req.params.taskId,
    createdBy: req.user._id,
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
const changeTaskStatus = async (req, updateBody) => {
  const query = {
    _id: req.params.taskId,
    createdBy: req.user._id,
  };
  const task = await Task.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * Get all Task with filter query (category, isCompleted, dateAndTime)
 */
const allTasks = async (req) => {
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
  const tasks = await Task.find(query);
  if (!tasks) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, something went wrong. Please try again.');
  }
  return tasks;
};

/**
 * Get Task by ID only
 */
const getTaskByIdOnly = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

module.exports = {
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  changeTaskStatus,
  allTasks,
  getTaskByIdOnly,
};
