import Joi from 'joi';

export const category = {
  categoryName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      'string.pattern.base': 'categoryName can only contain letters',
    }),
  cardColor: Joi.string().required(),
};

export const createCategory = {
  body: Joi.object().keys(category),
};

export const allCategories = {
  query: Joi.object().keys({
    onlyCategories: Joi.boolean(),
  }),
};

export const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys(category),
};

export const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string(),
  }),
};
