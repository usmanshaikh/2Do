import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import schedule from 'node-schedule';
import logger from '../config/logger';
import { Scheduler } from '../models';
import { taskService, userService, checklistService, emailService } from './index';
import { ApiError } from '../helpers';
import { taskInterface, checklistInterface, schedulerInterface } from '../interfaces';

const EVERY_SECONDS = '* * * * * *';
const EVERY_MINUTES = '* * * * *';
const EVERY_MIDNIGHT = '0 0 * * *';

export const createScheduler = async (schedulerData: any, schedulerType: 'task' | 'checklist') => {
  const { _id, dateAndTime } = schedulerData;
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

export const updateScheduler = async (
  schedulerData: taskInterface.ITask | checklistInterface.IChecklist,
  schedulerType: 'task' | 'checklist',
) => {
  const { _id, dateAndTime } = schedulerData;
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
  if (!scheduler && schedulerData.alert) {
    if (schedulerData.dateAndTime.getTime() > today.getTime()) {
      createScheduler(schedulerData, schedulerType);
      return;
    }
    return;
  }

  if (scheduler) {
    // Cancel the old scheduledJobs and then Initialize new if alert true
    cancelSchedulerById(scheduler.parentRefId);
    schedulerData.alert && addNewSchedulerAndInitialize(scheduler);
  }
};

/**
 *  Add new scheduler to scheduleJobs list and initialize
 */
export const addNewSchedulerAndInitialize = (schedulerData: schedulerInterface.IScheduler) => {
  const { schedulerName, schedulerDateAndTime, schedulerType, parentRefId } = schedulerData;
  schedule.scheduleJob(schedulerName, schedulerDateAndTime, async () => {
    if (schedulerType === 'task') {
      const task = await taskService.getTaskByIdOnly(parentRefId);
      if (task.createdBy) {
        const user = await userService.getUserById(task.createdBy);
        if (user) {
          emailService.sendEventReminderEmail(task, schedulerType, user);
        }
      }
    } else if (schedulerType === 'checklist') {
      const checklist = await checklistService.getChecklistByIdOnly(parentRefId);
      if (checklist.createdBy) {
        const user = await userService.getUserById(checklist.createdBy);
        if (user) {
          emailService.sendEventReminderEmail(checklist, schedulerType, user);
        }
      }
    }
  });
};

/**
 * If Server Stop/Restart then all old Schedulers that is initialize gets destroy. So once Server start then stop all the Schedulers and Initialize new Schedulers again.
 */
export const runSchedulers = async () => {
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
export const deleteSchedulerById = async (parentRefId: mongoose.Types.ObjectId | string) => {
  const scheduler = await Scheduler.findOneAndDelete({ parentRefId });
  if (!scheduler) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Scheduler not found');
  }
  cancelSchedulerById(parentRefId);
};

/**
 * Cancel Scheduler by ID
 */
export const cancelSchedulerById = async (id: mongoose.Types.ObjectId | string) => {
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

/**
 * Once DB is connectd then 'runSchedulers() gets initialize'.
 */
export const initializeSchedulersJob = () => {
  runSchedulers();
  logger.info(`Initialized Schedulers Job`);
};
