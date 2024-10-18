import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import { cardColorController } from '../../controllers/index.js';
import { cardColorValidation } from '../../validations/index.js';

const router = express.Router();

router.route('/').post(auth(), validate(cardColorValidation.createCardColor), cardColorController.createCardColor);

router.route('/').get(auth(), cardColorController.getAllCardColors);

export default router;
