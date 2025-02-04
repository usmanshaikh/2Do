import mongoose from 'mongoose';

export interface ITask {
  title: string;
  category: mongoose.Types.ObjectId;
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
  type: 'Task';
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type ITaskBody = Omit<ITask, 'type' | 'createdAt' | 'updatedAt'>;
