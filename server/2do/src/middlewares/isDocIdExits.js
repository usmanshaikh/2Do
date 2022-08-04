const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardColorService, categoryService } = require('../services');

/**
 * Use to check if category or cardColor ID is exits in the database.
 * @param {{ category: boolean, cardColor: boolean }} props
 */
exports.isDocIdExits = (props) => {
  return catchAsync(async (req, res, next) => {
    const { category, cardColor } = props;
    if (category) {
      const data = await categoryService.isCategoryExits(req);
      if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, 'category not found or Invalid category id');
      }
    }
    if (cardColor) {
      const data = await cardColorService.getCardColorById(req.body.cardColor);
      if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, 'cardColor not found or Invalid cardColor id');
      }
    }
    next();
  });
};
