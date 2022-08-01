const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { checkListService } = require('../services');

const createCheckList = catchAsync(async (req, res) => {
  const checkList = await checkListService.createCheckList(req.body);
  res.status(httpStatus.CREATED).send(checkList);
});

const getCheckLists = catchAsync(async (req, res) => {
  const checkLists = await checkListService.getAllCheckLists();
  res.send(checkLists);
});

const getCheckList = catchAsync(async (req, res) => {
  const checkList = await checkListService.getCheckListById(req.params.checkListId);
  if (!checkList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CheckList not found');
  }
  res.send(checkList);
});

const updateCheckList = catchAsync(async (req, res) => {
  const checkList = await checkListService.updateCheckListById(req.params.checkListId, req.body);
  res.send(checkList);
});

const deleteCheckList = catchAsync(async (req, res) => {
  await checkListService.deleteCheckListById(req.params.checkListId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAllCheckList = catchAsync(async (req, res) => {
  await checkListService.deleteAllCheckList();
  res.status(httpStatus.NO_CONTENT).send();
});

const changeCheckListStatus = catchAsync(async (req, res) => {
  const checkList = await checkListService.changeCheckListStatus(req.params.checkListId, req.body);
  res.send(checkList);
});

module.exports = {
  createCheckList,
  getCheckLists,
  getCheckList,
  updateCheckList,
  deleteCheckList,
  deleteAllCheckList,
  changeCheckListStatus,
};
