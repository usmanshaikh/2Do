const Joi = require('joi');
const { objectId } = require('./custom.validation');

const updateNotification = {
  params: Joi.object().keys({
    notificationId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  updateNotification,
};
