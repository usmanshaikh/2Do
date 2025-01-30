import mongoose, { Document, Model, Schema } from 'mongoose';
import { ICategory } from './category.model';

interface IChecklistItem {
  isChecked: boolean;
  text: string;
}

export interface IChecklist extends Document {
  title: string;
  checklistItems: IChecklistItem[];
  category: ICategory['_id'];
  cardColor: string;
  dateAndTime: Date;
  alert: boolean;
  isCompleted: boolean;
  type: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const checklistSchema: Schema<IChecklist> = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    checklistItems: [
      {
        isChecked: {
          type: Boolean,
          default: false,
          required: true,
        },
        text: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
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
      default: true,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      type: String,
      required: true,
      default: 'Checklist',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

checklistSchema.pre(['find', 'findOne'], function () {
  this.populate('category', 'categoryName cardColor _id');
});

const Checklist: Model<IChecklist> = mongoose.model<IChecklist>('Checklist', checklistSchema);

export default Checklist;
