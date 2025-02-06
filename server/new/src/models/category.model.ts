import mongoose, { Model, Schema } from 'mongoose';
import { categoryInterface } from '../interfaces';
import { removeFieldsPlugin } from './plugins';

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
      required: true,
      ref: 'User',
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

categorySchema.plugin(removeFieldsPlugin, ['__v']);

const Category: Model<categoryInterface.ICategory> = mongoose.model<categoryInterface.ICategory>('Category', categorySchema);

export default Category;
