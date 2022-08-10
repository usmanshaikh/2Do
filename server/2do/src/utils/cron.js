const schedule = require('node-schedule');
const { tokenService, schedulerService } = require('../services');

const EVERY_SECONDS = '* * * * * *';
const EVERY_MIDNIGHT = '0 0 * * *';

const deleteExpiredTokensJob = () => {
  schedule.scheduleJob(EVERY_MIDNIGHT, tokenService.deleteExpiredTokens);
};

const runSchedulersJob = () => {
  schedulerService.runSchedulers();
};

/**
 * Once DB is connectd then this Fn will loop and start all the Cron Jobs.
 */
const allCronJobs = () => {
  return {
    start: function () {
      [...Array(1)].map(() => {
        runSchedulersJob();
        deleteExpiredTokensJob();
      });
    },
  };
};

module.exports = allCronJobs();
