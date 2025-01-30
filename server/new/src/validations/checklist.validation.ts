import Joi from 'joi';

export const checklist = {
  title: Joi.string().required(),
  checklistItems: Joi.array().items({
    isChecked: Joi.boolean().required(),
    text: Joi.string().required(),
  }),
  category: Joi.string().hex().length(24).required(),
  cardColor: Joi.string().required(),
  dateAndTime: Joi.date().required(),
  alert: Joi.boolean().required(),
  isCompleted: Joi.boolean().required(),
};

export const createChecklist = {
  body: Joi.object().keys(checklist),
};

export const allChecklists = {
  body: Joi.object().keys({
    category: Joi.string().hex().length(24).required(),
    dateAndTime: Joi.date(),
    isCompleted: Joi.boolean(),
  }),
};

export const getChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().hex().length(24).required(),
  }),
};

export const updateChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys(checklist),
};

export const deleteChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().hex().length(24).required(),
  }),
};

export const changeChecklistStatus = {
  params: Joi.object().keys({
    checklistId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys({
    isCompleted: Joi.boolean().required(),
  }),
};
