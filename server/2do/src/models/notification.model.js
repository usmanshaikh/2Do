const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const notificationSchema = mongoose.Schema(
  {
    message: {
      type: String,
      trim: true,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['task', 'checklist'],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
