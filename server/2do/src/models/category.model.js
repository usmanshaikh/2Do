import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

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
