const CronJob = require('cron').CronJob;
const { tokenService } = require('../services');

const EVERY_SECONDS = '* * * * * *';
const EVERY_MIDNIGHT = '0 0 * * *';

const deleteExpiredTokens_job = new CronJob(EVERY_MIDNIGHT, tokenService.deleteExpiredTokens);

/**
 * Once DB is connectd then this Fn will loop and start all the Cron Jobs.
 */
const allCronJobs = () => {
  return {
    start: function () {
      [...Array(1)].map(() => {
        deleteExpiredTokens_job.start();
      });
    },
  };
};

module.exports = allCronJobs();
