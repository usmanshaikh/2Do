import Joi from 'joi';

const createCardColor = {
  body: Joi.object().keys({
    color: Joi.string().required(),
  }),
};

export default {
  createCardColor,
};
