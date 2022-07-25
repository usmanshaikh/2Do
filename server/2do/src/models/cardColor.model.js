const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const cardColorSchema = mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cardColorSchema.plugin(toJSON);

/**
 * @typedef CardColor
 */
const CardColor = mongoose.model('CardColor', cardColorSchema);

module.exports = CardColor;
