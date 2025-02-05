import mongoose from 'mongoose';
import moment from 'moment';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../models';
import { ApiError } from '../helpers';
import { taskInterface } from '../interfaces';

export const createTask = async (req: Request, res: Response, taskData: taskInterface.ITaskBody) => {
  taskData.createdBy = res.locals.user.userId;
  let task = await Task.create(taskData);
  const populateQuery = [{ path: 'category', select: 'id categoryName' }];
  task = await task.populate(populateQuery);
  return task;
};

export const getTaskById = async (req: Request, res: Response) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user.userId,
  };
  const tasks = await Task.findOne(query);
  if (!tasks) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  return tasks;
};

export const updateTaskById = async (req: Request, res: Response, taskData: taskInterface.ITaskBody) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user.userId,
  };
  const task = await Task.findOneAndUpdate(
    query,
    { $set: taskData },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  return task;
};

export const deleteTaskById = async (req: Request, res: Response) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user.userId,
  };
  const task = await Task.findOneAndDelete(query);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  return task;
};

export const changeTaskStatus = async (req: Request, res: Response, updateData: { isCompleted: boolean }) => {
  const query = {
    _id: req.params.taskId,
    createdBy: res.locals.user.userId,
  };
  const task = await Task.findOneAndUpdate(
    query,
    { $set: updateData },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  return task;
};

/**
 * Get all Task with filter query (category, isCompleted, dateAndTime)
 */
export const allTasks = async (req: Request, res: Response) => {
  const query = req.body;
  if (query.dateAndTime) {
    const dt = query.dateAndTime;
    const startOfDay = moment(dt).startOf('day').format();
    const endOfDay = moment(dt).endOf('day').format();
    query.dateAndTime = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }
  query.createdBy = res.locals.user.userId;
  const tasks = await Task.find(query);
  if (!tasks) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Sorry, something went wrong. Please try again.');
  }
  return tasks;
};

export const getTaskByIdOnly = async (_id: mongoose.Types.ObjectId | string) => {
  const task = await Task.findById(_id);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  return task;
};
