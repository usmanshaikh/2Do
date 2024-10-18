import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import userValidation from '../../validations/user.validation.js';
import userController from '../../controllers/user.controller.js';
import uploadImage from '../../middlewares/uploadImage.js';

const router = express.Router();

router.route('/statistic-report').get(auth(), userController.statisticReport);
router.route('/completed-percentage').get(auth(), userController.completedPercentage);
router.route('/my-profile').get(auth(), userController.myProfile);
router
  .route('/update-my-profile')
  .post(auth(), uploadImage.single('image'), validate(userValidation.updateMyProfile), userController.updateMyProfile);

export default router;
