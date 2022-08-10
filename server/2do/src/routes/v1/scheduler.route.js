const express = require('express');
const { schedulerController } = require('../../controllers');

const router = express.Router();

router.route('/getAllSchedulers').get(schedulerController.getAllSchedulers);
router.route('/deleteAllSchedulers').delete(schedulerController.deleteAllSchedulers);

// var isoDateString = new Date().toISOString();
// console.log(isoDateString);

module.exports = router;
