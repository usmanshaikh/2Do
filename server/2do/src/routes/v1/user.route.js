const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const uploadImage = require('../../middlewares/uploadImage');

const router = express.Router();

router.route('/statistic-report').get(auth(), userController.statisticReport);
router.route('/completed-percentage').get(auth(), userController.completedPercentage);
router.route('/my-profile').get(auth(), userController.myProfile);
router
  .route('/update-my-profile')
  .post(auth(), uploadImage.single('image'), validate(userValidation.updateMyProfile), userController.updateMyProfile);

module.exports = router;
