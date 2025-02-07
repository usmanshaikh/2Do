import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Checklist, Task, User } from '../models';
import { ApiError } from '../helpers';
import { MESSAGES } from '../constants';

export const createUser = async (userData: { email: string; password: string; name: string }) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, MESSAGES.EMAIL_ALREADY_TAKEN);
  }
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

export const getUserById = async (id: mongoose.Types.ObjectId | string) => {
  const user = User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
  }
  return user;
};

export const updateUserById = async (
  id: string,
  userData: {
    email?: string;
    password?: string;
    name?: string;
  },
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
  }

  if (userData.email) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, MESSAGES.EMAIL_ALREADY_TAKEN);
    }
  }

  Object.assign(user, userData);
  await user.save();
  return user;
};

export const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
  }
  return user;
};

export const statisticReport = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;

  const taskCounts = await Task.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId.createFromHexString(userId) } },
    { $group: { _id: '$isCompleted', count: { $sum: 1 } } },
  ]);

  const checklistCounts = await Checklist.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId.createFromHexString(userId) } },
    { $group: { _id: '$isCompleted', count: { $sum: 1 } } },
  ]);

  const formatStatistics = (counts: any[]) => {
    const stats = { created: 0, completed: 0, pending: 0 };
    counts.forEach(({ _id, count }) => {
      if (_id === true) stats.completed = count;
      else stats.pending = count;
    });
    stats.created = stats.completed + stats.pending;
    return [
      { label: 'created', count: stats.created },
      { label: 'completed', count: stats.completed },
      { label: 'pending', count: stats.pending },
    ];
  };

  const result = {
    taskStatistic: formatStatistics(taskCounts),
    checklistStatistic: formatStatistics(checklistCounts),
  };
  return result;
};
