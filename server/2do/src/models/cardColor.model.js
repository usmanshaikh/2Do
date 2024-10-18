import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

const cardColorSchema = mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

cardColorSchema.plugin(toJSON);

const CardColor = mongoose.model('CardColor', cardColorSchema);

export default CardColor;
