const schedule = require('node-schedule');
const logger = require('../config/logger');
const { Scheduler } = require('../models');
const { tokenService } = require('../services');

const EVERY_SECONDS = '* * * * * *';
const EVERY_MIDNIGHT = '0 0 * * *';

/**
 * Create a Scheduler
 */
const createScheduler = async (body) => {
  const { _id, dateAndTime } = body;
  const SchedulerObj = {
    schedulerName: `scheduler_${_id}`,
    schedulerDateAndTime: dateAndTime,
    parentRefId: _id,
    message: extractMsg(body),
  };
  const scheduler = await Scheduler.create(SchedulerObj);
  addNewSchedulerAndInitialize(scheduler);
  return scheduler;
};

/**
 * Update Scheduler By ID
 */
const updateScheduler = async (body) => {
  const { _id, dateAndTime } = body;
  const query = { parentRefId: _id };
  const updateBody = {
    schedulerDateAndTime: dateAndTime,
    message: extractMsg(body),
  };

  const scheduler = await Scheduler.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );

  if (!scheduler) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scheduler not found');
  }

  // Cancel the old scheduledJobs and then Initialize new
  const job = schedule.scheduledJobs[scheduler.schedulerName];
  job && job.cancel();
  addNewSchedulerAndInitialize(scheduler);
};

/**
 *  Add new scheduler to scheduleJobs list and initialize
 */
const addNewSchedulerAndInitialize = async (body) => {
  const { schedulerName, schedulerDateAndTime, message } = body;
  schedule.scheduleJob(schedulerName, schedulerDateAndTime, function () {
    sendNotification(message);
  });
};

/**
 * If Server Stop/Restart then all old Schedulers that is initialize gets destroy. So once Server start then stop all the Schedulers and initialize again.
 */
const runSchedulers = async () => {
  const schedulers = await Scheduler.find();
  schedulers.map((doc) => {
    const { schedulerName, schedulerDateAndTime, message } = doc;
    const today = new Date();
    const schedulerDT = new Date(schedulerDateAndTime);
    if (schedulerDT.getTime() > today.getTime()) {
      schedule.scheduleJob(schedulerName, schedulerDateAndTime, function () {
        sendNotification(message);
      });
    }
  });
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

const extractMsg = (body) => {
  body = JSON.parse(JSON.stringify(body));
  let message;
  const isFromTask = body.hasOwnProperty('description');
  isFromTask ? (message = body.description) : (message = body.title);
  return message;
};

const sendNotification = (message) => {
  console.log('Notification Send =>', message);
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
  runSchedulers,
  getAllSchedulers,
  deleteAllSchedulers,
  initializeSchedulersJob,
};

// var isoDateString = new Date().toISOString();
// console.log(isoDateString);
