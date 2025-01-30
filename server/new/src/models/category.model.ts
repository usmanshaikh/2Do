import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface ICategory extends Document {
  categoryName: string;
  cardColor: string;
  createdBy: IUser['_id'];
  deletable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    cardColor: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deletable: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
