const httpStatus = require('http-status');
const moment = require('moment');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
  let task = await Task.create(taskBody);
  task = await task.populate(['category', 'cardColor']).execPopulate();
  return task;
};

/**
 * Get all task
 * @returns {Promise<Task>}
 */
const getAllTasks = async (query) => {
  const tasks = await Task.find();
  return tasks;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  return Task.findById(id);
};

/**
 * Update task by id
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

/**
 * Delete task by id
 * @param {ObjectId} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

/**
 * Delete all task
 * @returns {Promise<Task>}
 */
const deleteAllTask = async () => {
  const tasks = await Task.deleteMany({});
  return tasks;
};

/**
 * Change task Status by id
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const changeTaskStatus = async (taskId, updateBody) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * All task with filter query (category, isCompleted, dateAndTime)
 * @param {Object} query
 * @returns {Promise<Task>}
 */
const allTasks = async (query) => {
  if (query.dateAndTime) {
    const dt = query.dateAndTime;
    const startOfDay = moment(dt).startOf('day').format();
    const endOfDay = moment(dt).endOf('day').format();
    query.dateAndTime = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }
  const tasks = await Task.find(query);
  if (!tasks || !tasks.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No data found');
  }
  return tasks;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  deleteAllTask,
  changeTaskStatus,
  allTasks,
};
