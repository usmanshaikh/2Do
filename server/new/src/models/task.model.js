import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import Category from './category.model.js';

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    cardColor: {
      type: String,
      required: true,
    },
    dateAndTime: {
      type: Date,
      required: true,
    },
    alert: {
      type: Boolean,
      required: true,
      default: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      type: String,
      required: true,
      default: 'Task',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.plugin(toJSON);

taskSchema.pre(['find', 'findOne'], function () {
  this.populate('category', 'categoryName cardColor _id');
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
