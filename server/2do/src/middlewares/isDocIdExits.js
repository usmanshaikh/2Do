import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { categoryService } from '../services/index.js';

/**
 * Use to check if categoryName and category is exits in the database.
 * @param {{ category: Boolean, categoryName: Boolean }} props
 */
export const isDocIdExits = (props) => {
  return catchAsync(async (req, res, next) => {
    const { category, categoryName } = props;

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
    next();
  });
};
