const Joi = require('joi');
const { objectId } = require('./custom.validation');

const checkList = {
  title: Joi.string().required(),
  checkListItems: Joi.array().items({
    isChecked: Joi.boolean().required(),
    text: Joi.string().required(),
  }),
  category: Joi.required().custom(objectId),
  cardColor: Joi.required().custom(objectId),
  setDateAndTime: Joi.date().required(),
  alert: Joi.boolean().required(),
  isCompleted: Joi.boolean().required(),
};

const createCheckList = {
  body: Joi.object().keys(checkList),
};

const getCheckList = {
  params: Joi.object().keys({
    checkListId: Joi.string().custom(objectId),
  }),
};

const updateCheckList = {
  params: Joi.object().keys({
    checkListId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(checkList),
};

const deleteCheckList = {
  params: Joi.object().keys({
    checkListId: Joi.string().custom(objectId),
  }),
};

const changeCheckListStatus = {
  params: Joi.object().keys({
    checkListId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    isCompleted: Joi.boolean().required(),
  }),
};

module.exports = {
  createCheckList,
  getCheckList,
  updateCheckList,
  deleteCheckList,
  changeCheckListStatus,
};
