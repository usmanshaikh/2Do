import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import schedule from 'node-schedule';
import logger from '../config/logger';
import { Scheduler } from '../models';
import { taskService, userService, checklistService, emailService } from './index';
import { ApiError } from '../helpers';
import { taskInterface, checklistInterface, schedulerInterface } from '../interfaces';

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
  const { _id, dateAndTime, alert } = schedulerData;

  // Find the existing scheduler for this task/checklist
  const scheduler = await Scheduler.findOne({ parentRefId: _id });

  // Scenario 1: If the task/checklist alert is on and the date/time is updated, we need to update the scheduler.
  if (alert) {
    if (scheduler) {
      // Cancel old scheduled job
      cancelSchedulerById(scheduler.parentRefId);

      // Update scheduler with the new date and time
      scheduler.schedulerDateAndTime = dateAndTime;
      await scheduler.save();

      // Initialize a new job with the updated time
      addNewSchedulerAndInitialize(scheduler);
    } else {
      // If no existing scheduler found create a new one
      await createScheduler(schedulerData, schedulerType);
    }
  } else {
    // Scenario 2: If the alert is turned off, cancel the scheduler and stop the email.
    if (scheduler) {
      await deleteSchedulerById(_id);
    }
  }
};

export const deleteSchedulerById = async (parentRefId: mongoose.Types.ObjectId | string) => {
  const scheduler = await Scheduler.findOneAndDelete({ parentRefId });
  if (!scheduler) {
    throw new ApiError(StatusCodes.NOT_FOUND, `Scheduler for task/checklist with ID ${parentRefId} not found.`);
  }
  logger.info(`Scheduler for parentRefId ${parentRefId} deleted successfully.`);
  cancelSchedulerById(parentRefId);
};

export const cancelSchedulerById = async (id: mongoose.Types.ObjectId | string) => {
  const schedulerName = `scheduler_${id}`;
  const job = schedule.scheduledJobs[schedulerName];
  if (job) {
    job.cancel();
    logger.info(`Job with schedulerName ${schedulerName} cancelled successfully.`);
  } else {
    logger.warn(
      `No job found with schedulerName ${schedulerName}. It might have already been cancelled or never scheduled.`,
    );
  }
};

export const addNewSchedulerAndInitialize = (schedulerData: schedulerInterface.IScheduler) => {
  const { schedulerName, schedulerDateAndTime, schedulerType, parentRefId } = schedulerData;

  // Check if the job already exists, and if it does, cancel the previous job
  if (schedule.scheduledJobs[schedulerName]) {
    schedule.scheduledJobs[schedulerName].cancel();
  }

  schedule.scheduleJob(schedulerName, schedulerDateAndTime, async () => {
    if (schedulerType === 'task') {
      const task = await taskService.getTaskByIdOnly(parentRefId);
      if (task) {
        const user = await userService.getUserById(task.createdBy);
        if (user) {
          await emailService.sendEventReminderEmail(task, schedulerType, user);
        } else {
          logger.error(`User with ID ${task.createdBy} not found for task ${parentRefId}`);
        }
      } else {
        logger.error(`Task with ID ${parentRefId} not found`);
      }
    } else if (schedulerType === 'checklist') {
      const checklist = await checklistService.getChecklistByIdOnly(parentRefId);
      if (checklist) {
        const user = await userService.getUserById(checklist.createdBy);
        if (user) {
          await emailService.sendEventReminderEmail(checklist, schedulerType, user);
        } else {
          logger.error(`User with ID ${checklist.createdBy} not found for checklist ${parentRefId}`);
        }
      } else {
        logger.error(`Checklist with ID ${parentRefId} not found`);
      }
    }
  });
};

/**
 * If Server Stop/Restart then all old Schedulers that is initialize gets destroy. So once Server start then stop all the Schedulers and Initialize new Schedulers again.
 */
export const initializeSchedulersOnStart = async () => {
  try {
    // Fetch all scheduled tasks/checklists from the database
    const allSchedulers = await Scheduler.find();
    // Loop through each scheduler and re-initialize it
    allSchedulers.forEach((schedulerData) => {
      const { schedulerName, schedulerDateAndTime, schedulerType } = schedulerData;
      const currentTime = new Date();
      // Check if the scheduler date/time is in the future
      if (schedulerDateAndTime.getTime() > currentTime.getTime()) {
        addNewSchedulerAndInitialize(schedulerData);
        logger.info(`Re-initialized scheduler job: ${schedulerName}`);
      } else {
        logger.info(`Skipping past scheduler job: ${schedulerName}`);
      }
    });
  } catch (error) {
    logger.error('Error initializing schedulers on server start:', error);
  }
};

export const initializeSchedulersJob = () => {
  initializeSchedulersOnStart();
  logger.info(`Initialized Schedulers Job`);
};

// export const getAllSchedulers = async () => {
//   const schedulers = await Scheduler.find();
//   return schedulers;
// };

// export const deleteAllSchedulers = async () => {
//   const schedulers = await Scheduler.deleteMany({});
//   return schedulers;
// };
