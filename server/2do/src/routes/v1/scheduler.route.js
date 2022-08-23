const express = require('express');
const { schedulerController } = require('../../controllers');

const router = express.Router();

router.route('/get-all').get(schedulerController.getAllSchedulers);
router.route('/delete-all').delete(schedulerController.deleteAllSchedulers);

module.exports = router;
