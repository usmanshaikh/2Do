const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const CardColor = require('./cardColor.model');
const Category = require('./category.model');

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
      type: mongoose.Schema.Types.ObjectId,
      ref: CardColor,
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
  }
);

checklistSchema.plugin(toJSON);

// populate cardColor
checklistSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function (next) {
  const populateQuery = [{ path: 'category', select: 'id categoryName' }, { path: 'cardColor' }];
  this.populate(populateQuery);
  next();
});

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
