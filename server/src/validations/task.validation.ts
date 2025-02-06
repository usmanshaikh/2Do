import Joi from 'joi';

export const task = {
  title: Joi.string().required(),
  category: Joi.string().hex().length(24).required(),
  cardColor: Joi.string().required(),
  dateAndTime: Joi.date().required(),
  alert: Joi.boolean().required(),
  isCompleted: Joi.boolean().required(),
};

export const createTask = {
  body: Joi.object().keys(task),
};

export const allTasks = {
  body: Joi.object().keys({
    category: Joi.string().hex().length(24).required(),
    dateAndTime: Joi.date(),
    isCompleted: Joi.boolean(),
  }),
};

export const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().hex().length(24).required(),
  }),
};

export const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys(task),
};

export const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().hex().length(24).required(),
  }),
};

export const changeTaskStatus = {
  params: Joi.object().keys({
    taskId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys({
    isCompleted: Joi.boolean().required(),
  }),
};
