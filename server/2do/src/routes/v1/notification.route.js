const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { notificationValidation } = require('../../validations');
const { notificationController } = require('../../controllers');

const router = express.Router();

// Admin Route - delete this
router.route('/get-all').get(auth(), notificationController.getAllNotifications);

router
  .route('/update/:notificationId')
  .get(auth(), validate(notificationValidation.updateNotification), notificationController.updateNotification);

router.route('/delete-all').delete(auth(), notificationController.deleteAllNotifications);

module.exports = router;
