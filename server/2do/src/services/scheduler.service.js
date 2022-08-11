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
  const SchedulerObj = {
    schedulerName: `scheduler_${body._id}`,
    schedulerDateAndTime: body.dateAndTime,
    parentRefId: body._id,
  };
  return Scheduler.create(SchedulerObj);
};

/**
 * If Server Stop/Restart then all old Schedulers that is initialize gets destroy. So once Server start then stop all the Schedulers and initialize again.
 */
const runSchedulers = async () => {
  const schedulers = await Scheduler.find();
  schedulers.map((val) => {
    const { schedulerName, schedulerDateAndTime } = val;
    const today = new Date();
    const schedulerDT = new Date(schedulerDateAndTime);
    if (schedulerDT.getTime() > today.getTime()) {
      schedule.scheduleJob(schedulerName, schedulerDateAndTime, function () {
        console.log('Notification Send');
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
  runSchedulers,
  getAllSchedulers,
  deleteAllSchedulers,
  initializeSchedulersJob,
};

// var isoDateString = new Date().toISOString();
// console.log(isoDateString);
