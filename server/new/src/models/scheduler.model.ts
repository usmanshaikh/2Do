import mongoose, { Model, Schema } from 'mongoose';
import { schedulerInterface } from '../interfaces';

const schedulerSchema: Schema<schedulerInterface.IScheduler> = new Schema(
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
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Scheduler: Model<schedulerInterface.IScheduler> = mongoose.model<schedulerInterface.IScheduler>(
  'Scheduler',
  schedulerSchema,
);

export default Scheduler;
