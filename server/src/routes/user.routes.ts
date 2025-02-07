import express from 'express';
import { userController } from '../controllers';
import { authenticateJWT, validate } from '../middlewares';
import { userValidation } from '../validations';

const router = express.Router();

router.get('/statistic-report', authenticateJWT, userController.statisticReport);
router
  .route('/')
  .get(authenticateJWT, userController.getUser)
  .patch(authenticateJWT, validate(userValidation.updateUser), userController.updateUser);
export default router;
