const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');

const updateNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.updateNotification(req);
  res.send(notification);
});

const deleteAllNotifications = catchAsync(async (req, res) => {
  await notificationService.deleteAllNotifications(req);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAllNotifications = catchAsync(async (req, res) => {
  const notifications = await notificationService.getAllNotifications();
  res.send(notifications);
});

module.exports = {
  updateNotification,
  deleteAllNotifications,
  getAllNotifications,
};
