import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import Category from './category.model.js';

const checklistSchema = mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

checklistSchema.plugin(toJSON);

checklistSchema.pre(['find', 'findOne'], function () {
  this.populate('category', 'categoryName cardColor _id');
});

const Checklist = mongoose.model('Checklist', checklistSchema);

export default Checklist;
