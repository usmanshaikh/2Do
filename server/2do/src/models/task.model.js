const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const CardColor = require('./cardColor.model');
const Category = require('./category.model');

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
  }
);

taskSchema.plugin(toJSON);

// populate cardColor
taskSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function (next) {
  const populateQuery = [{ path: 'category', select: 'id categoryName' }, { path: 'cardColor' }];
  this.populate(populateQuery);
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
