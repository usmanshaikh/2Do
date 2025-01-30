import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from '../services/index.js';
import { ApiError } from '../helpers';
import { catchAsync } from '../middlewares';

/**
 * Use to check if categoryName and category is exits in the database.
 * @param {{ category: Boolean, categoryName: Boolean }} props
 */
export const isDocIdExits = (props) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { category, categoryName } = props;

    if (categoryName) {
      const data = await categoryService.isCategoryNameAlreadyExits(req);
      if (data) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'category name already exits');
      }
    }
    if (category) {
      const data = await categoryService.isCategoryExits(req);
      if (!data) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'category not found or Invalid category id');
      }
    }
    next();
  });
};
