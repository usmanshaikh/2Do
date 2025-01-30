import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from '../services';
import { catchAsync } from '../middlewares';
import { sendResponse } from '../helpers';
import { MESSAGES } from '../constants';

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.USER_DATA_RETRIEVED,
    data: user,
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userService.updateUserById(userId, req.body);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.USER_UPDATED,
    data: user,
  });
});

export const statisticReport = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.statisticReport(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.USER_STATISTICS_FETCHED,
    data: user,
  });
});

export const completedPercentage = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.completedPercentage(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.USER_COMPLETION_PERCENTAGE_FETCHED,
    data: user,
  });
});
