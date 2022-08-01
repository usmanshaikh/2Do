const Joi = require('joi');
const { objectId } = require('./custom.validation');

const task = {
  description: Joi.string().required(),
  category: Joi.required().custom(objectId),
  cardColor: Joi.required().custom(objectId),
  setDateAndTime: Joi.date().required(),
  alert: Joi.boolean().required(),
  isCompleted: Joi.boolean().required(),
};

const createTask = {
  body: Joi.object().keys(task),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(task),
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const changeTaskStatus = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    isCompleted: Joi.boolean().required(),
  }),
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
};
