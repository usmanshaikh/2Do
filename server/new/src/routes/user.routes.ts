import express from 'express';
import { userController } from '../controllers';
import { authenticateJWT, uploadImage, validate } from '../middlewares';
import { userValidation } from '../validations';

const router = express.Router();

router.get('/statistic-report', authenticateJWT, userController.statisticReport);
router.get('/completed-percentage', authenticateJWT, userController.completedPercentage);
router
  .route('/:userId')
  .get(authenticateJWT, validate(userValidation.getUser), userController.getUser)
  .patch(authenticateJWT, uploadImage.single('image'), validate(userValidation.updateUser), userController.updateUser);
export default router;
