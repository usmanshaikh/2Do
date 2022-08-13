const httpStatus = require('http-status');
const schedule = require('node-schedule');
const logger = require('../config/logger');
const { Scheduler } = require('../models');
const { tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const EVERY_SECONDS = '* * * * * *';
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
    message: extractMsg(body),
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
    message: extractMsg(body),
  };

  const scheduler = await Scheduler.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );

  if (!scheduler && body.alert) {
    createScheduler(body, schedulerType);
    return;
  }

  // Cancel the old scheduledJobs and then Initialize new if alert true
  cancelSchedulerById(scheduler.parentRefId);
  body.alert && addNewSchedulerAndInitialize(scheduler);
};

/**
 *  Add new scheduler to scheduleJobs list and initialize
 */
const addNewSchedulerAndInitialize = async (body) => {
  const { schedulerName, schedulerDateAndTime, schedulerType, message } = body;
  schedule.scheduleJob(schedulerName, schedulerDateAndTime, function () {
    sendNotification(schedulerType, message);
  });
};

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

const extractMsg = (body) => {
  body = JSON.parse(JSON.stringify(body));
  let message;
  const isFromTask = body.hasOwnProperty('description');
  isFromTask ? (message = body.description) : (message = body.title);
  return message;
};

const sendNotification = (schedulerType, message) => {
  const msg = `Notification Send type => ${schedulerType} & message => ${message}`;
  console.log(msg);
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
