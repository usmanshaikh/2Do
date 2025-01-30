import { StatusCodes } from 'http-status-codes';
import { User } from '../models';
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

export const getUserById = async (id: string) => {
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

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
export const updateUserPassword = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
export const verifyUserEmail = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Statistic Report
 */
export const statisticReport = async (req) => {
  let aggregateData = await User.aggregate([
    {
      $match: {
        _id: res.locals.user._id,
      },
    },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'createdBy',
        as: 'taskData',
      },
    },
    {
      $lookup: {
        from: 'checklists',
        localField: '_id',
        foreignField: 'createdBy',
        as: 'checklistData',
      },
    },
    {
      $facet: {
        taskCreatedCount: [
          { $unwind: '$taskData' },
          {
            $addFields: {
              'taskData.status': 'created',
            },
          },
          {
            $group: {
              _id: null,
              label: { $first: '$taskData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, label: 1, count: 1 },
          },
        ],
        taskCPCount: [
          { $unwind: '$taskData' },
          {
            $addFields: {
              'taskData.status': {
                $cond: {
                  if: {
                    $eq: ['$taskData.isCompleted', true],
                  },
                  then: 'completed',
                  else: 'pending',
                },
              },
            },
          },
          {
            $group: {
              _id: '$taskData.status',
              label: { $first: '$taskData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, label: 1, count: 1 },
          },
        ],
        checklistCreatedCount: [
          { $unwind: '$checklistData' },
          {
            $addFields: {
              'checklistData.status': 'created',
            },
          },
          {
            $group: {
              _id: null,
              label: { $first: '$checklistData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, label: 1, count: 1 },
          },
        ],
        checklistCPCount: [
          { $unwind: '$checklistData' },
          {
            $addFields: {
              'checklistData.status': {
                $cond: {
                  if: {
                    $eq: ['$checklistData.isCompleted', true],
                  },
                  then: 'completed',
                  else: 'pending',
                },
              },
            },
          },
          {
            $group: {
              _id: '$checklistData.status',
              label: { $first: '$checklistData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              label: 1,
              count: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        taskStatistic: {
          $concatArrays: ['$taskCreatedCount', '$taskCPCount'],
        },
        checklistStatistic: {
          $concatArrays: ['$checklistCreatedCount', '$checklistCPCount'],
        },
      },
    },
  ]);
  const allLabels = ['created', 'completed', 'pending'];
  const taskLabels = [];
  const checklistLabels = [];

  aggregateData[0].taskStatistic.map((item) => taskLabels.push(item.label));
  aggregateData[0].checklistStatistic.map((item) => checklistLabels.push(item.label));

  let tl = allLabels.filter((obj) => taskLabels.indexOf(obj) == -1);
  let cl = allLabels.filter((obj) => checklistLabels.indexOf(obj) == -1);

  tl.map((label) => aggregateData[0].taskStatistic.push({ label, count: 0 }));
  cl.map((label) => aggregateData[0].checklistStatistic.push({ label, count: 0 }));

  return aggregateData[0];
};

/**
 * Task & Checklist Completed Percentage
 */
export const completedPercentage = async (req) => {
  let aggregateData = await User.aggregate([
    {
      $match: {
        _id: res.locals.user._id,
      },
    },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'createdBy',
        as: 'taskData',
      },
    },
    {
      $lookup: {
        from: 'checklists',
        localField: '_id',
        foreignField: 'createdBy',
        as: 'checklistData',
      },
    },
    {
      $facet: {
        taskTotalCount: [
          { $unwind: '$taskData' },
          {
            $addFields: {
              'taskData.status': 'created',
            },
          },
          {
            $group: {
              _id: null,
              label: { $first: '$taskData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, label: 1, count: 1 },
          },
        ],
        taskCompletedCount: [
          { $unwind: '$taskData' },
          {
            $addFields: {
              'taskData.status': {
                $cond: {
                  if: {
                    $eq: ['$taskData.isCompleted', true],
                  },
                  then: 'completed',
                  else: '',
                },
              },
            },
          },
          {
            $match: {
              'taskData.status': 'completed',
            },
          },
          {
            $group: {
              _id: '$taskData.status',
              label: { $first: '$taskData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, label: 1, count: 1 },
          },
        ],
        checklistTotalCount: [
          { $unwind: '$checklistData' },
          {
            $addFields: {
              'checklistData.status': 'created',
            },
          },
          {
            $group: {
              _id: null,
              label: { $first: '$checklistData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, label: 1, count: 1 },
          },
        ],
        checklistCompletedCount: [
          { $unwind: '$checklistData' },
          {
            $addFields: {
              'checklistData.status': {
                $cond: {
                  if: {
                    $eq: ['$checklistData.isCompleted', true],
                  },
                  then: 'completed',
                  else: '',
                },
              },
            },
          },
          {
            $match: {
              'checklistData.status': 'completed',
            },
          },
          {
            $group: {
              _id: '$checklistData.status',
              label: { $first: '$checklistData.status' },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              label: 1,
              count: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        taskTotal_Count: { $arrayElemAt: ['$taskTotalCount', 0] },
        taskCompleted_Count: { $arrayElemAt: ['$taskCompletedCount', 0] },
        checklistTotal_Count: { $arrayElemAt: ['$checklistTotalCount', 0] },
        checklistCompleted_Count: { $arrayElemAt: ['$checklistCompletedCount', 0] },
      },
    },
    {
      $project: {
        taskCompletedPercentage: {
          $round: [
            {
              $multiply: [
                100,
                {
                  $divide: ['$taskCompleted_Count.count', '$taskTotal_Count.count'],
                },
              ],
            },
            0,
          ],
        },
        checklistCompletedPercentage: {
          $round: [
            {
              $multiply: [
                100,
                {
                  $divide: ['$checklistCompleted_Count.count', '$checklistTotal_Count.count'],
                },
              ],
            },
            0,
          ],
        },
      },
    },
  ]);
  return aggregateData;
};
