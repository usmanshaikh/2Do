const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const CardColor = require('./cardColor.model');

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    cardColor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CardColor,
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
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
