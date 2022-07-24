const Joi = require('joi');
const { objectId } = require('./custom.validation');

const category = {
  categoryName: Joi.string().required(),
  cardColor: Joi.object().keys({
    id: Joi.number().required(),
    color: Joi.string().required(),
  }),
};

const createCategory = {
  body: Joi.object().keys(category),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(category),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};