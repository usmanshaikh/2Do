import Joi from 'joi';
import { objectId } from './custom.validation.js';

const category = {
  categoryName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      'string.pattern.base': 'categoryName can only contain letters',
    }),
  cardColor: Joi.required().custom(objectId),
};

const createCategory = {
  body: Joi.object().keys(category),
};

const allCategories = {
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

export default {
  createCategory,
  allCategories,
  updateCategory,
  deleteCategory,
};
