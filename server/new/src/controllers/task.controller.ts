import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../middlewares';
import { taskService, schedulerService } from '../services';
import { sendResponse } from '../helpers';
import { MESSAGES } from '../constants';

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req, req.body);
  const today = new Date();
  if (task.alert && task.dateAndTime.getTime() > today.getTime()) {
    await schedulerService.createScheduler(task, 'task');
  }
  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    message: MESSAGES.TASK_CREATED,
    data: task,
  });
});

export const getTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.TASK_FETCHED,
    data: task,
  });
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.updateTaskById(req, req.body);
  await schedulerService.updateScheduler(task, 'task');
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.TASK_UPDATED,
    data: task,
  });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  await taskService.deleteTaskById(req);
  await schedulerService.deleteSchedulerById(req.params.taskId);
  sendResponse({
    res,
    statusCode: StatusCodes.NO_CONTENT,
    message: MESSAGES.TASK_DELETED,
  });
});

export const changeTaskStatus = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.changeTaskStatus(req, req.body);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.TASK_STATUS_CHANGED,
    data: task,
  });
});

export const allTasks = catchAsync(async (req: Request, res: Response) => {
  const tasks = await taskService.allTasks(req);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.ALL_TASKS_FETCHED,
    data: tasks,
  });
});
