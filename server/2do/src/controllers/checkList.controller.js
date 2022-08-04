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

// ----------------------------------------------------------------------------------------------------------------------------------------------------

const deleteAllChecklist = catchAsync(async (req, res) => {
  await checklistService.deleteAllChecklist();
  res.status(httpStatus.NO_CONTENT).send();
});

const getChecklists = catchAsync(async (req, res) => {
  const checklists = await checklistService.getAllChecklists();
  res.send(checklists);
});

module.exports = {
  createChecklist,
  getChecklists,
  getChecklist,
  updateChecklist,
  deleteChecklist,
  deleteAllChecklist,
  changeChecklistStatus,
  allChecklists,
};
