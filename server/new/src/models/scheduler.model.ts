import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IScheduler extends Document {
  schedulerName: string;
  schedulerDateAndTime: Date;
  schedulerType: 'task' | 'checklist';
  parentRefId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schedulerSchema: Schema<IScheduler> = new Schema(
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

const Scheduler: Model<IScheduler> = mongoose.model<IScheduler>('Scheduler', schedulerSchema);

export default Scheduler;
