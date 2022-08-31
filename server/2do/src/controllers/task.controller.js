const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taskService, schedulerService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req, req.body);
  const today = new Date();
  if (task.alert && task.dateAndTime.getTime() > today.getTime()) {
    await schedulerService.createScheduler(task, 'task');
  }
  res.status(httpStatus.CREATED).send(task);
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req);
  res.send(task);
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(req, req.body);
  await schedulerService.updateScheduler(task, 'task');
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req);
  await schedulerService.deleteSchedulerById(req.params.taskId);
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

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
  allTasks,
};
