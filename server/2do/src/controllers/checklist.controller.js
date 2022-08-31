const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { checklistService, schedulerService } = require('../services');

const createChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.createChecklist(req, req.body);
  const today = new Date();
  if (checklist.alert && checklist.dateAndTime.getTime() > today.getTime()) {
    await schedulerService.createScheduler(checklist, 'checklist');
  }
  res.status(httpStatus.CREATED).send(checklist);
});

const getChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.getChecklistById(req);
  res.send(checklist);
});

const updateChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.updateChecklistById(req, req.body);
  await schedulerService.updateScheduler(checklist, 'checklist');
  res.send(checklist);
});

const deleteChecklist = catchAsync(async (req, res) => {
  await checklistService.deleteChecklistById(req);
  await schedulerService.deleteSchedulerById(req.params.checklistId);
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

module.exports = {
  createChecklist,
  getChecklist,
  updateChecklist,
  deleteChecklist,
  changeChecklistStatus,
  allChecklists,
};
