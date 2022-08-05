const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { checklistService } = require('../services');

const createChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.createChecklist(req, req.body);
  res.status(httpStatus.CREATED).send(checklist);
});

const getChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.getChecklistById(req);
  res.send(checklist);
});

const updateChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.updateChecklistById(req, req.body);
  res.send(checklist);
});

const deleteChecklist = catchAsync(async (req, res) => {
  await checklistService.deleteChecklistById(req);
  res.status(httpStatus.NO_CONTENT).send();
});

const changeChecklistStatus = catchAsync(async (req, res) => {
  const checklist = await checklistService.changeChecklistStatus(req, req.body);
  res.send(checklist);
});

const allChecklists = catchAsync(async (req, res) => {
  const checklist = await checklistService.allChecklists(req);
  res.send(checklist);
});

// ------------- Admin -------------

const getAllChecklists = catchAsync(async (req, res) => {
  const checklists = await checklistService.getAllChecklists();
  res.send(checklists);
});

const deleteAllChecklists = catchAsync(async (req, res) => {
  await checklistService.deleteAllChecklists();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createChecklist,
  getChecklist,
  updateChecklist,
  deleteChecklist,
  changeChecklistStatus,
  allChecklists,
  getAllChecklists,
  deleteAllChecklists,
};
