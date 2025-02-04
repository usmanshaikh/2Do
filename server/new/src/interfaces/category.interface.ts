import mongoose from 'mongoose';

export interface ICategory {
  categoryName: string;
  cardColor: string;
  createdBy: mongoose.Types.ObjectId;
  deletable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
