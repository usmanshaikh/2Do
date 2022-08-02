const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { checklistService } = require('../services');

const createChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.createChecklist(req.body);
  res.status(httpStatus.CREATED).send(checklist);
});

const getChecklists = catchAsync(async (req, res) => {
  const checklists = await checklistService.getAllChecklists();
  res.send(checklists);
});

const getChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.getChecklistById(req.params.checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
  }
  res.send(checklist);
});

const updateChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.updateChecklistById(req.params.checklistId, req.body);
  res.send(checklist);
});

const deleteChecklist = catchAsync(async (req, res) => {
  await checklistService.deleteChecklistById(req.params.checklistId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAllChecklist = catchAsync(async (req, res) => {
  await checklistService.deleteAllChecklist();
  res.status(httpStatus.NO_CONTENT).send();
});

const changeChecklistStatus = catchAsync(async (req, res) => {
  const checklist = await checklistService.changeChecklistStatus(req.params.checklistId, req.body);
  res.send(checklist);
});

module.exports = {
  createChecklist,
  getChecklists,
  getChecklist,
  updateChecklist,
  deleteChecklist,
  deleteAllChecklist,
  changeChecklistStatus,
};
