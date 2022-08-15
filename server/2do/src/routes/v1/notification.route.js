const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { notificationValidation } = require('../../validations');
const { notificationController } = require('../../controllers');

const router = express.Router();

router.route('/getAllNotifications').get(auth(), notificationController.getAllNotifications);

router
  .route('/updateNotification/:notificationId')
  .get(auth(), validate(notificationValidation.updateNotification), notificationController.updateNotification);

router.route('/deleteAllNotifications').delete(auth(), notificationController.deleteAllNotifications);

module.exports = router;
