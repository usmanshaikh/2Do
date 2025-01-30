import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

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
    schedulerType: {
      type: String,
      enum: ['task', 'checklist'],
      required: true,
    },
    parentRefId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

schedulerSchema.plugin(toJSON);

const Scheduler = mongoose.model('Scheduler', schedulerSchema);

export default Scheduler;
