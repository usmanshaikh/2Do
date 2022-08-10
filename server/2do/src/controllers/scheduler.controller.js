const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { schedulerService } = require('../services');

const createScheduler = catchAsync(async (req, res) => {
  await schedulerService.createScheduler(req.body);
});

const getAllSchedulers = catchAsync(async (req, res) => {
  const schedulers = await schedulerService.getAllSchedulers();
  res.send(schedulers);
});

const deleteAllSchedulers = catchAsync(async (req, res) => {
  await schedulerService.deleteAllSchedulers();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createScheduler,
  getAllSchedulers,
  deleteAllSchedulers,
};
