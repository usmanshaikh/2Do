import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { userService } from '../services/index.js';

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const myProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateMyProfile = catchAsync(async (req, res) => {
  const user = await userService.updateMyProfile(req);
  res.send(user);
});

const statisticReport = catchAsync(async (req, res) => {
  const user = await userService.statisticReport(req);
  res.send(user);
});

const completedPercentage = catchAsync(async (req, res) => {
  const user = await userService.completedPercentage(req);
  res.send(user);
});

export default {
  createUser,
  myProfile,
  updateMyProfile,
  statisticReport,
  completedPercentage,
};
