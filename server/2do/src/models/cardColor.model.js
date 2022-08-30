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

cardColorSchema.plugin(toJSON);

const CardColor = mongoose.model('CardColor', cardColorSchema);

module.exports = CardColor;
