const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a User
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Get User by ID
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get User by email
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update User by ID
 */
const updateMyProfile = async (req) => {
  const updateBody = {
    name: req.body.name,
    image: {
      contentType: req.file.mimetype,
      name: req.file.originalname,
      data: req.file.buffer,
    },
  };
  const id = req.user._id;
  const user = await User.findByIdAndUpdate(
    id,
    { $set: updateBody },
    { runValidators: true, new: true, useFindAndModify: false }
  );
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

/**
 * Statistic Report
 */
const statisticReport = async (req) => {
  let aggregateData = await User.aggregate([
    {
      $match: {
        _id: req.user._id,
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
  return aggregateData;
};

/**
 * Task & Checklist Completed Percentage
 */
const completedPercentage = async (req) => {
  let aggregateData = await User.aggregate([
    {
      $match: {
        _id: req.user._id,
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

// ------------- Admin -------------

/**
 * Get all Users
 */
const getAllUsers = async () => {
  const users = await User.find({ role: { $ne: 'admin' } });
  return users;
};

/**
 * Delete all Users
 */
const deleteAllUsers = async () => {
  const users = await User.deleteMany({ role: { $ne: 'admin' } });
  return users;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateMyProfile,
  statisticReport,
  completedPercentage,
  getAllUsers,
  deleteAllUsers,
};
