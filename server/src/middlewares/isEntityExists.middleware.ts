import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from '../services';
import { ApiError } from '../helpers';
import { catchAsync } from '.';

const isEntityExists = (props: { category?: boolean; categoryName?: boolean }) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { category, categoryName } = props;

    if (categoryName) {
      const data = await categoryService.isCategoryNameAlreadyExits(req, res);
      if (data) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'category name already exits');
      }
    }
    if (category) {
      const data = await categoryService.isCategoryExits(req, res);
      if (!data) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'category not found or Invalid category id');
      }
    }
    next();
  });
};

export default isEntityExists;
