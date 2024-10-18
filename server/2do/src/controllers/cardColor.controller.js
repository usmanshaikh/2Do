import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { cardColorService } from '../services/index.js';

const createCardColor = catchAsync(async (req, res) => {
  const cardColor = await cardColorService.createCardColor(req.body);
  res.status(httpStatus.CREATED).send(cardColor);
});

const getAllCardColors = catchAsync(async (req, res) => {
  const cardColors = await cardColorService.getAllCardColors();
  res.send(cardColors);
});

export default {
  createCardColor,
  getAllCardColors,
};
