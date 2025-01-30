import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../middlewares';
import { categoryService } from '../services';
import { sendResponse } from '../helpers';
import { MESSAGES } from '../constants';

export const createDefaultCategoryAfterRegister = catchAsync(async (user) => {
  await categoryService.createDefaultCategoryAfterRegister(user);
});

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req, req.body);
  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    message: MESSAGES.CATEGORY_CREATED,
    data: category,
  });
});

export const allCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await categoryService.allCategories(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.CATEGORY_FETCHED_ALL,
    data: categories,
  });
});

export const categoryWithTaskAndChecklistCount = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.categoryWithTaskAndChecklistCount(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.CATEGORY_FETCHED_WITH_TASK_COUNT,
    data: category,
  });
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.updateCategoryById(req, req.body);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.CATEGORY_UPDATED,
    data: category,
  });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await categoryService.deleteCategoryById(req);
  sendResponse({
    res,
    statusCode: StatusCodes.NO_CONTENT,
    message: MESSAGES.CATEGORY_DELETED,
  });
});
