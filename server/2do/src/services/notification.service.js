const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Notification } = require('../models');

/**
 * Create a Notification
 */
const createNotification = async (noficationBody) => {
  await Notification.create(noficationBody);
};

/**
 * Update Notification by ID
 */
const updateNotification = async (req) => {
  const query = { _id: req.params.notificationId, userId: req.user._id };
  const notification = await Notification.findOneAndUpdate(
    query,
    { $set: { isRead: true } },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  return notification;
};

/**
 * Delete all Notifications by userId
 */
const deleteAllNotifications = async (req) => {
  const query = { userId: req.user._id };
  const notifications = await Notification.deleteMany(query);
  return notifications;
};

/**
 * Delete Read Notifications Job
 */
const deleteReadNotifications = async () => {
  const query = { isRead: true };
  await Notification.deleteMany(query);
};

/**
 * Get all Notifications
 */
const getAllNotifications = async () => {
  const notifications = await Notification.find();
  if (!notifications) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  return notifications;
};

module.exports = {
  createNotification,
  updateNotification,
  deleteAllNotifications,
  deleteReadNotifications,
  getAllNotifications,
};
