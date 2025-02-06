import mongoose from 'mongoose';
import moment from 'moment';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Checklist } from '../models';
import { ApiError } from '../helpers';
import { checklistInterface } from '../interfaces';

export const createChecklist = async (req: Request, res: Response, checklistData: checklistInterface.IChecklistBody) => {
  const checklistDate = new Date(checklistData.dateAndTime);
  const now = new Date();
  // Add a 10-second buffer to prevent microsecond mismatches
  if (checklistDate.getTime() < now.getTime() + 10000) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Checklist date cannot be in the past or too close to the current time.');
  }
  checklistData.createdBy = res.locals.user.userId;
  let checklist = await Checklist.create(checklistData);
  const populateQuery = [{ path: 'category', select: 'id categoryName' }];
  checklist = await checklist.populate(populateQuery);
  return checklist;
};

export const getChecklistById = async (req: Request, res: Response) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user.userId,
  };
  const checklists = await Checklist.findOne(query);
  if (!checklists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Checklist not found');
  }
  return checklists;
};

export const updateChecklistById = async (req: Request, res: Response, checklistData: checklistInterface.IChecklistBody) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user.userId,
  };
  const checklists = await Checklist.findOneAndUpdate(
    query,
    { $set: checklistData },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!checklists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Checklist not found');
  }
  return checklists;
};

export const deleteChecklistById = async (req: Request, res: Response) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user.userId,
  };
  const checklists = await Checklist.findOneAndDelete(query);
  if (!checklists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Checklist not found');
  }
  return checklists;
};

export const changeChecklistStatus = async (req: Request, res: Response, updateData: { isCompleted: boolean }) => {
  const query = {
    _id: req.params.checklistId,
    createdBy: res.locals.user.userId,
  };
  const checklist = await Checklist.findOneAndUpdate(query, { $set: updateData }, { runValidators: true, new: true });
  if (!checklist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Checklist not found');
  }
  return checklist;
};

/**
 * All checklist with filter query (category, isCompleted, dateAndTime)
 */
export const allChecklists = async (req: Request, res: Response) => {
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
  const checklist = await Checklist.find(query);
  if (!checklist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Sorry, something went wrong. Please try again.');
  }
  return checklist;
};

export const getChecklistByIdOnly = async (_id: mongoose.Types.ObjectId | string) => {
  const checklist = await Checklist.findById(_id);
  if (!checklist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Checklist not found');
  }
  return checklist;
};
