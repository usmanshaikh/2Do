const express = require('express');
const catchAsync = require('../../utils/catchAsync');
const CronJob = require('cron').CronJob;

const runCronJobs = catchAsync(async (req, res) => {
  const second = req.body.second;
  console.log({ second });
  console.log('instantiation');
  let date = new Date();
  console.log('Default date:', date);
  date.setSeconds(date.getSeconds() + second);
  const job = new CronJob(date, function () {
    console.log('Run date:', date);
  });
  job.start();
  res.status(202).send();
});

const router = express.Router();
router.route('/').post(runCronJobs);

// var isoDateString = new Date().toISOString();
// console.log(isoDateString);

module.exports = router;
