const httpStatus = require('http-status');
const schedule = require('node-schedule');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Scheduler } = require('../models');
const { tokenService, taskService, userService, checklistService, emailService } = require('../services');

const EVERY_SECONDS = '* * * * * *';
const EVERY_MINUTES = '* * * * *';
const EVERY_MIDNIGHT = '0 0 * * *';

/**
 * Create a Scheduler
 * @param {object} body
 * @param {('task'|'checklist')} schedulerType
 */
const createScheduler = async (body, schedulerType) => {
  const { _id, dateAndTime } = body;
  const SchedulerObj = {
    schedulerName: `scheduler_${_id}`,
    schedulerDateAndTime: dateAndTime,
    schedulerType: schedulerType,
    parentRefId: _id,
  };
  const scheduler = await Scheduler.create(SchedulerObj);
  addNewSchedulerAndInitialize(scheduler);
  return scheduler;
};

/**
 * Update Scheduler By ID
 * @param {object} body
 * @param {('task'|'checklist')} schedulerType
 */
const updateScheduler = async (body, schedulerType) => {
  const { _id, dateAndTime } = body;
  const query = { parentRefId: _id };
  const updateBody = {
    schedulerDateAndTime: dateAndTime,
  };

  const scheduler = await Scheduler.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );

  const today = new Date();
  if (!scheduler && body.alert) {
    if (body.dateAndTime.getTime() > today.getTime()) {
      createScheduler(body, schedulerType);
      return;
    }
    return;
  }

  // Cancel the old scheduledJobs and then Initialize new if alert true
  cancelSchedulerById(scheduler.parentRefId);
  body.alert && addNewSchedulerAndInitialize(scheduler);
};

/**
 *  Add new scheduler to scheduleJobs list and initialize
 */
const addNewSchedulerAndInitialize = catchAsync(async (body) => {
  const { schedulerName, schedulerDateAndTime, schedulerType, parentRefId } = body;
  schedule.scheduleJob(schedulerName, schedulerDateAndTime, async () => {
    if (schedulerType === 'task') {
      const task = await taskService.getTaskByIdOnly(parentRefId);
      const user = await userService.getUserById(task.createdBy);
      emailService.sendEventReminderEmail(task, schedulerType, user);
    } else if (schedulerType === 'checklist') {
      const checklist = await checklistService.getChecklistByIdOnly(parentRefId);
      const user = await userService.getUserById(checklist.createdBy);
      emailService.sendEventReminderEmail(checklist, schedulerType, user);
    }
  });
});

/**
 * If Server Stop/Restart then all old Schedulers that is initialize gets destroy. So once Server start then stop all the Schedulers and Initialize new Schedulers again.
 */
const runSchedulers = async () => {
  const schedulers = await Scheduler.find();
  schedulers.map((doc) => {
    const today = new Date();
    const schedulerDT = new Date(doc.schedulerDateAndTime);
    if (schedulerDT.getTime() > today.getTime()) {
      addNewSchedulerAndInitialize(doc);
    }
  });
};

/**
 * Delete Scheduler by ID
 */
const deleteSchedulerById = async (parentRefId) => {
  const scheduler = await Scheduler.findOneAndDelete({ parentRefId });
  if (!scheduler) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scheduler not found');
  }
  cancelSchedulerById(parentRefId);
};

/**
 * Cancel Scheduler by ID
 */
const cancelSchedulerById = async (id) => {
  const schedulerName = `scheduler_${id}`;
  const job = schedule.scheduledJobs[schedulerName];
  job && job.cancel();
};

/**
 * Get all Schedulers
 */
const getAllSchedulers = async () => {
  const schedulers = await Scheduler.find();
  return schedulers;
};

/**
 * Delete all Schedulers
 */
const deleteAllSchedulers = async () => {
  const schedulers = await Scheduler.deleteMany({});
  return schedulers;
};

const deleteExpiredTokensJob = () => {
  schedule.scheduleJob(EVERY_MIDNIGHT, tokenService.deleteExpiredTokens);
};

/**
 * Once DB is connectd then 'runSchedulers() & deleteExpiredTokensJob() gets initialize'.
 */
const initializeSchedulersJob = () => {
  runSchedulers();
  deleteExpiredTokensJob();
  logger.info(`Initialized Schedulers Job`);
};

module.exports = {
  createScheduler,
  updateScheduler,
  deleteSchedulerById,
  runSchedulers,
  getAllSchedulers,
  deleteAllSchedulers,
  initializeSchedulersJob,
};

// var isoDateString = new Date().toISOString();
// console.log(isoDateString);
