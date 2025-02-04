import mongoose from 'mongoose';

export interface IChecklistItem {
  isChecked: boolean;
  text: string;
}

export interface IChecklist {
  _id: mongoose.Types.ObjectId;
  title: string;
  checklistItems: IChecklistItem[];
  category: mongoose.Types.ObjectId;
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
  type: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IChecklistBody = Omit<IChecklist, '_id' | 'createdAt' | 'updatedAt'>;
