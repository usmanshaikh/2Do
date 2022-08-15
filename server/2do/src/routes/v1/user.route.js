const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const uploadImage = require('../../middlewares/uploadImage');

const router = express.Router();

// Admin Route
router.route('/deleteAllUsers').delete(auth('deleteAllUsers'), userController.deleteAllUsers);
router.route('/getAllUsers').get(auth('getAllUsers'), userController.getAllUsers);

router.route('/statisticReport').get(auth(), userController.statisticReport);
router.route('/completedPercentage').get(auth(), userController.completedPercentage);
router.route('/myProfile').get(auth(), userController.myProfile);
router
  .route('/updateMyProfile')
  .post(auth(), uploadImage.single('image'), validate(userValidation.updateMyProfile), userController.updateMyProfile);

module.exports = router;
