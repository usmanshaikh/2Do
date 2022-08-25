const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardColorService, categoryService } = require('../services');

/**
 * Use to check if categoryName and category or cardColor ID is exits in the database.
 * @param {{ category: Boolean, cardColor: Boolean, categoryName: Boolean }} props
 */
exports.isDocIdExits = (props) => {
  return catchAsync(async (req, res, next) => {
    const { category, cardColor, categoryName } = props;

    if (categoryName) {
      const data = await categoryService.isCategoryNameAlreadyExits(req);
      if (data) {
        throw new ApiError(httpStatus.NOT_FOUND, 'category name already exits');
      }
    }
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
