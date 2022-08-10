const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const schedulerSchema = mongoose.Schema(
  {
    schedulerName: {
      type: String,
      required: true,
    },
    schedulerDateAndTime: {
      type: Date,
      required: true,
    },
    parentRefId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
schedulerSchema.plugin(toJSON);

const Scheduler = mongoose.model('Scheduler', schedulerSchema);

module.exports = Scheduler;
