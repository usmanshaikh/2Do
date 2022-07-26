const Joi = require('joi');
const { objectId } = require('./custom.validation');

const category = {
  categoryName: Joi.string().required(),
  cardColor: Joi.required().custom(objectId),
};

const createCategory = {
  body: Joi.object().keys(category),
};

const getCategory = {
  query: Joi.object().keys({
    onlyCategories: Joi.boolean(),
  }),
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
  getCategory,
  updateCategory,
  deleteCategory,
};
