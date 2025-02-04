import mongoose from 'mongoose';

export interface IScheduler {
  schedulerName: string;
  schedulerDateAndTime: Date;
  schedulerType: 'task' | 'checklist';
  parentRefId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
