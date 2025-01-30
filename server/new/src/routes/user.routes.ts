import express from 'express';
import { userController } from '../controllers';
import { authenticateJWT, validate } from '../middlewares';
import { userValidation } from '../validations';

const router = express.Router();

router
  .route('/:userId')
  .get(authenticateJWT, validate(userValidation.getUser), userController.getUser)
  .patch(authenticateJWT, uploadImage.single('image'), validate(userValidation.updateUser), userController.updateUser)
  .delete(authenticateJWT, validate(userValidation.deleteUser), userController.deleteUser);
router.get('/statistic-report', authenticateJWT, userController.statisticReport);
router.get('/completed-percentage', authenticateJWT, userController.completedPercentage);

export default router;
