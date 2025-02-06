import mongoose from 'mongoose';

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  categoryName: string;
  cardColor: string;
  createdBy: mongoose.Types.ObjectId;
  deletable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
