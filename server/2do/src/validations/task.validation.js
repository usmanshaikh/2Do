import Joi from 'joi';
import { objectId } from './custom.validation.js';

const task = {
  title: Joi.string().required(),
  category: Joi.required().custom(objectId),
  cardColor: Joi.string().required(),
  dateAndTime: Joi.date().required(),
  alert: Joi.boolean().required(),
  isCompleted: Joi.boolean().required(),
};

const createTask = {
  body: Joi.object().keys(task),
};

const allTasks = {
  body: Joi.object().keys({
    category: Joi.string().required().custom(objectId),
    dateAndTime: Joi.date(),
    isCompleted: Joi.boolean(),
  }),
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

export default {
  createTask,
  allTasks,
  getTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
};
