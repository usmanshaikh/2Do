const Joi = require('joi');

const createCardColor = {
  body: Joi.object().keys({
    color: Joi.string().required(),
  }),
};

module.exports = {
  createCardColor,
};
