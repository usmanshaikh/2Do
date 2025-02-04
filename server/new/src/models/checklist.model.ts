import mongoose, { Model, Schema } from 'mongoose';
import { checklistInterfaces } from '../interfaces';

const checklistSchema: Schema<checklistInterfaces.IChecklist> = new Schema(
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

const Checklist: Model<checklistInterfaces.IChecklist> = mongoose.model<checklistInterfaces.IChecklist>(
  'Checklist',
  checklistSchema,
);

export default Checklist;
