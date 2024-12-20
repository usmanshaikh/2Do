import Joi from 'joi';
import { objectId } from './custom.validation.js';

const checklist = {
  title: Joi.string().required(),
  checklistItems: Joi.array().items({
    isChecked: Joi.boolean().required(),
    text: Joi.string().required(),
  }),
  category: Joi.required().custom(objectId),
  cardColor: Joi.string().required(),
  dateAndTime: Joi.date().required(),
  alert: Joi.boolean().required(),
  isCompleted: Joi.boolean().required(),
};

const createChecklist = {
  body: Joi.object().keys(checklist),
};

const allChecklists = {
  body: Joi.object().keys({
    category: Joi.string().custom(objectId),
    dateAndTime: Joi.date(),
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

export default {
  createChecklist,
  allChecklists,
  getChecklist,
  updateChecklist,
  deleteChecklist,
  changeChecklistStatus,
};
