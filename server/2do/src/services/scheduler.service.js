const { Scheduler } = require('../models');
const schedule = require('node-schedule');

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
      console.log('Selected date => Future');
      schedule.scheduleJob(schedulerName, schedulerDateAndTime, function () {
        console.log('Notification Send');
      });
      console.log({ schedule });
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

const deleteAllSchedulers = async () => {
  const schedulers = await Scheduler.deleteMany({});
  return schedulers;
};

module.exports = {
  createScheduler,
  runSchedulers,
  getAllSchedulers,
  deleteAllSchedulers,
};
