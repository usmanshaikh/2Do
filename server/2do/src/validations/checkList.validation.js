const Joi = require('joi');
const { objectId } = require('./custom.validation');

const checklist = {
  title: Joi.string().required(),
  checklistItems: Joi.array().items({
    isChecked: Joi.boolean().required(),
    text: Joi.string().required(),
  }),
  category: Joi.required().custom(objectId),
  cardColor: Joi.required().custom(objectId),
  setDateAndTime: Joi.date().required(),
  alert: Joi.boolean().required(),
  isCompleted: Joi.boolean().required(),
};

const createChecklist = {
  body: Joi.object().keys(checklist),
};

const getChecklists = {
  query: Joi.object().keys({
    category: Joi.custom(objectId),
    isCompleted: Joi.boolean(),
  }),
};

const getChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().custom(objectId),
  }),
};

const updateChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(checklist),
};

const deleteChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().custom(objectId),
  }),
};

const changeChecklistStatus = {
  params: Joi.object().keys({
    checklistId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    isCompleted: Joi.boolean().required(),
  }),
};

module.exports = {
  createChecklist,
  getChecklists,
  getChecklist,
  updateChecklist,
  deleteChecklist,
  changeChecklistStatus,
};
