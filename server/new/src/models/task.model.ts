import mongoose, { Document, Model, Schema } from 'mongoose';
import { ICategory } from './category.model';

export interface ITask extends Document {
  title: string;
  category: ICategory['_id'];
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
  type: 'Task';
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
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
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.pre(['find', 'findOne'], function () {
  this.populate('category', 'categoryName cardColor _id');
});

const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default Task;
