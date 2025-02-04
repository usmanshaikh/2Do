import mongoose, { Model, Schema } from 'mongoose';
import { categoryInterface } from '../interfaces';

const categorySchema: Schema<categoryInterface.ICategory> = new Schema(
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

const Category: Model<categoryInterface.ICategory> = mongoose.model<categoryInterface.ICategory>('Category', categorySchema);

export default Category;
