const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { cardColorController } = require('../../controllers');
const { cardColorValidation } = require('../../validations');

const router = express.Router();

router.route('/').post(auth(), validate(cardColorValidation.createCardColor), cardColorController.createCardColor);

router.route('/').get(auth(), cardColorController.getAllCardColors);

module.exports = router;
