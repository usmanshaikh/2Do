import Joi from 'joi';
import { MESSAGES } from '../constants';

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)
        .message(MESSAGES.PASSWORD_REQUIREMENTS),
      name: Joi.string(),
      image: Joi.any(),
    })
    .min(1),
  file: Joi.any(), // Optional
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};
