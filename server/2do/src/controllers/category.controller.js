const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createDefaultCategoryAfterRegister = catchAsync(async (user) => {
  await categoryService.createDefaultCategoryAfterRegister(user);
});

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req, req.body);
  res.status(httpStatus.CREATED).send(category);
});

const allCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.allCategories(req);
  res.send(categories);
});

const categoryWithTaskAndChecklistCount = catchAsync(async (req, res) => {
  const category = await categoryService.categoryWithTaskAndChecklistCount(req);
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategory,
  allCategories,
  updateCategory,
  deleteCategory,
  categoryWithTaskAndChecklistCount,
  createDefaultCategoryAfterRegister,
};
