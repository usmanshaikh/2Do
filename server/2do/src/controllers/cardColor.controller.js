const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardColorService } = require('../services');

const createCardColor = catchAsync(async (req, res) => {
  const cardColor = await cardColorService.createCardColor(req.body);
  res.status(httpStatus.CREATED).send(cardColor);
});

const getAllCardColor = catchAsync(async (req, res) => {
  const cardColor = await cardColorService.getAllCardColor();
  res.send(cardColor);
});

module.exports = {
  createCardColor,
  getAllCardColor,
};
