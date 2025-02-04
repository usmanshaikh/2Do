import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Category, Task, Checklist } from '../models';
import { ApiError } from '../helpers';

/**
 * Create default Category after register
 */
export const createDefaultCategoryAfterRegister = async (_id: string) => {
  const categoryBody = {
    categoryName: 'Personal',
    cardColor: '#f96060',
    createdBy: _id,
    deletable: false,
  };
  await Category.create(categoryBody);
};

/**
 * Create a Category
 */
export const createCategory = async (
  req: Request,
  res: Response,
  categoryData: { categoryName: string; cardColor: string },
) => {
  const categoryBody = { ...categoryData, createdBy: res.locals.user._id };
  const category = await Category.create(categoryBody);
  return category;
};

/**
 * Get all Categories
 */
export const allCategories = async (req: Request, res: Response) => {
  const query = {
    createdBy: res.locals.user._id,
  };
  let removedField = [];
  if (req.query.onlyCategories) {
    removedField.push('-deletable', '-createdBy');
  }
  const categories = await Category.find(query).select(removedField);
  return categories;
};

/**
 * Get Category with task & checklist counts
 */
export const categoryWithTaskAndChecklistCount = async (req: Request, res: Response) => {
  let groupData = await Category.aggregate([
    {
      $match: {
        createdBy: res.locals.user._id,
      },
    },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'category',
        as: 'taskData',
      },
    },
    {
      $lookup: {
        from: 'checklists',
        localField: '_id',
        foreignField: 'category',
        as: 'checklistData',
      },
    },
    {
      $group: {
        _id: '$_id',
        categoryName: { $first: '$categoryName' },
        cardColor: { $first: '$cardColor' },
        deletable: { $first: { $ifNull: ['$deletable', false] } },
        taskData: { $first: '$taskData' },
        checklistData: { $first: '$checklistData' },
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        categoryName: 1,
        cardColor: 1,
        deletable: 1,
        taskCount: { $cond: { if: { $isArray: '$taskData' }, then: { $size: '$taskData' }, else: 'NA' } },
        checklistCount: { $cond: { if: { $isArray: '$checklistData' }, then: { $size: '$checklistData' }, else: 'NA' } },
      },
    },
  ]);
  return groupData;
};

/**
 * Update Category by ID
 */
export const updateCategoryById = async (
  req: Request,
  res: Response,
  categoryData: { categoryName: string; cardColor: string },
) => {
  const query = {
    _id: req.params.categoryId,
    createdBy: res.locals.user._id,
  };
  const category = await Category.findOneAndUpdate(
    query,
    { $set: categoryData },
    { runValidators: true, new: true, useFindAndModify: false },
  );
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * Delete Category by ID
 */
export const deleteCategoryById = async (req: Request, res: Response) => {
  const tasks = await Task.find({ category: req.params.categoryId });
  if (tasks.length) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Category contain Tasks. Please move Tasks to another category to delete this category.',
    );
  }

  const checklists = await Checklist.find({ category: req.params.categoryId });
  if (checklists.length) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Category contain Checklists. Please move Checklists to another category to delete this category.',
    );
  }

  const query = {
    _id: req.params.categoryId,
    createdBy: res.locals.user._id,
    deletable: true,
  };
  const category = await Category.findOneAndDelete(query);
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * To check if Category ID exits. This function used in isEntityExists Middlewares.
 */
export const isCategoryExits = async (req: Request, res: Response) => {
  const query = {
    _id: req.body.category,
    createdBy: res.locals.user._id,
  };
  const category = await Category.findOne(query);
  return category;
};

/**
 * To check if Category name already exits or not. This function used in isEntityExists Middlewares.
 */
export const isCategoryNameAlreadyExits = async (req: Request, res: Response) => {
  const categoryName = req.body.categoryName;
  const query = {
    categoryName: { $regex: new RegExp(categoryName, 'i') },
    createdBy: res.locals.user._id,
  };
  const category = await Category.findOne(query);
  return category;
};
