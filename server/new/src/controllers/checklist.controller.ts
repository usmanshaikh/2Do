import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { catchAsync } from '../middlewares';
import { checklistService, schedulerService } from '../services/index.js';
import { sendResponse } from '../helpers';
import { MESSAGES } from '../constants';

export const createChecklist = catchAsync(async (req: Request, res: Response) => {
  const checklist = await checklistService.createChecklist(req, req.body);
  const today = new Date();
  if (checklist.alert && checklist.dateAndTime.getTime() > today.getTime()) {
    await schedulerService.createScheduler(checklist, 'checklist');
  }
  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    message: MESSAGES.CHECKLIST_CREATED,
    data: checklist,
  });
});

export const getChecklist = catchAsync(async (req: Request, res: Response) => {
  const checklist = await checklistService.getChecklistById(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.CHECKLIST_FETCHED,
    data: checklist,
  });
});

export const updateChecklist = catchAsync(async (req: Request, res: Response) => {
  const checklist = await checklistService.updateChecklistById(req, req.body);
  await schedulerService.updateScheduler(checklist, 'checklist');
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.CHECKLIST_UPDATED,
    data: checklist,
  });
});

export const deleteChecklist = catchAsync(async (req: Request, res: Response) => {
  await checklistService.deleteChecklistById(req);
  await schedulerService.deleteSchedulerById(req.params.checklistId);
  sendResponse({
    res,
    statusCode: StatusCodes.NO_CONTENT,
    message: MESSAGES.CHECKLIST_DELETED,
  });
});

export const changeChecklistStatus = catchAsync(async (req: Request, res: Response) => {
  const checklist = await checklistService.changeChecklistStatus(req, req.body);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.CHECKLIST_STATUS_CHANGED,
    data: checklist,
  });
});

export const allChecklists = catchAsync(async (req: Request, res: Response) => {
  const checklist = await checklistService.allChecklists(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.ALL_CHECKLISTS_FETCHED,
    data: checklist,
  });
});
