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
      type: mongoose.Schema.ObjectId,
      ref: CardColor,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);

// populate cardColor
categorySchema.pre(['find'], function (next) {
  this.populate({ path: 'cardColor' });
  next();
});

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
