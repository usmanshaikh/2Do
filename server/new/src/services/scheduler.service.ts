import httpStatus from 'http-status';
import schedule from 'node-schedule';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { Scheduler } from '../models/index.js';
import { tokenService, taskService, userService, checklistService, emailService } from './index.js';

const EVERY_SECONDS = '* * * * * *';
const EVERY_MINUTES = '* * * * *';
const EVERY_MIDNIGHT = '0 0 * * *';

/**
 * Create a Scheduler
 * @param {object} body
 * @param {('task'|'checklist')} schedulerType
 */
export const createScheduler = async (body, schedulerType) => {
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
export const updateScheduler = async (body, schedulerType) => {
  const { _id, dateAndTime } = body;
  const query = { parentRefId: _id };
  const updateBody = {
    schedulerDateAndTime: dateAndTime,
  };

  const scheduler = await Scheduler.findOneAndUpdate(
    query,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false },
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
export const addNewSchedulerAndInitialize = catchAsync(async (body) => {
  const { schedulerName, schedulerDateAndTime, schedulerType, parentRefId } = body;
  export schedule.scheduleJob(schedulerName, schedulerDateAndTime, async () => {
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
export const runSchedulers = async () => {
  const schedulers = await Scheduler.find();
  export schedulers.map((doc) => {
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
export const deleteSchedulerById = async (parentRefId) => {
  const scheduler = await Scheduler.findOneAndDelete({ parentRefId });
  if (!scheduler) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scheduler not found');
  }
  cancelSchedulerById(parentRefId);
};

/**
 * Cancel Scheduler by ID
 */
export const cancelSchedulerById = async (id) => {
  const schedulerName = `scheduler_${id}`;
  const job = schedule.scheduledJobs[schedulerName];
  job && job.cancel();
};

/**
 * Get all Schedulers
 */
export const getAllSchedulers = async () => {
  const schedulers = await Scheduler.find();
  return schedulers;
};

/**
 * Delete all Schedulers
 */
export const deleteAllSchedulers = async () => {
  const schedulers = await Scheduler.deleteMany({});
  return schedulers;
};

export const deleteExpiredTokensJob = () => {
  schedule.scheduleJob(EVERY_MIDNIGHT, tokenService.deleteExpiredTokens);
};

/**
 * Once DB is connectd then 'runSchedulers() & deleteExpiredTokensJob() gets initialize'.
 */
export const initializeSchedulersJob = () => {
  runSchedulers();
  deleteExpiredTokensJob();
  logger.info(`Initialized Schedulers Job`);
};

export default {
  createScheduler,
  updateScheduler,
  deleteSchedulerById,
  runSchedulers,
  getAllSchedulers,
  deleteAllSchedulers,
  initializeSchedulersJob,
};
