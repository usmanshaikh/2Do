const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checkListValidation = require('../../validations/checkList.validation');
const checkListController = require('../../controllers/checkList.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(checkListValidation.createCheckList), checkListController.createCheckList)
  .get(auth(), checkListController.getCheckLists);

router
  .route('/:checkListId')
  .get(auth(), validate(checkListValidation.getCheckList), checkListController.getCheckList)
  .patch(auth(), validate(checkListValidation.updateCheckList), checkListController.updateCheckList)
  .delete(auth(), validate(checkListValidation.deleteCheckList), checkListController.deleteCheckList);

module.exports = router;
