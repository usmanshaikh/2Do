const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardColorService } = require('../services');

const createCardColor = catchAsync(async (req, res) => {
  const cardColor = await cardColorService.createCardColor(req.body);
  res.status(httpStatus.CREATED).send(cardColor);
});

const getAllCardColors = catchAsync(async (req, res) => {
  const cardColors = await cardColorService.getAllCardColors();
  res.send(cardColors);
});

module.exports = {
  createCardColor,
  getAllCardColors,
};
