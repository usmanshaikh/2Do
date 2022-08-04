const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req, req.body);
  res.status(httpStatus.CREATED).send(task);
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req);
  res.send(task);
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(req, req.body);
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req);
  res.status(httpStatus.NO_CONTENT).send();
});

const changeTaskStatus = catchAsync(async (req, res) => {
  const task = await taskService.changeTaskStatus(req, req.body);
  res.send(task);
});

const allTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.allTasks(req);
  res.send(tasks);
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------

const deleteAllTask = catchAsync(async (req, res) => {
  await taskService.deleteAllTask();
  res.status(httpStatus.NO_CONTENT).send();
});

const getTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.send(tasks);
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  deleteAllTask,
  changeTaskStatus,
  allTasks,
};
