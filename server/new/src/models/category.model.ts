import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import User from './user.model.js';

const categorySchema = mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
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

categorySchema.plugin(toJSON);

const Category = mongoose.model('Category', categorySchema);

export default Category;
