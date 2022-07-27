const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checkListValidation = require('../../validations/checkList.validation');
const checkListController = require('../../controllers/checkList.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

const router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(checkListValidation.createCheckList),
    isDocIdExits({ category: true, cardColor: true }),
    checkListController.createCheckList
  )
  .get(auth(), checkListController.getCheckLists);

router
  .route('/:checkListId')
  .get(auth(), validate(checkListValidation.getCheckList), checkListController.getCheckList)
  .patch(
    auth(),
    validate(checkListValidation.updateCheckList),
    isDocIdExits({ category: true, cardColor: true }),
    checkListController.updateCheckList
  )
  .delete(auth(), validate(checkListValidation.deleteCheckList), checkListController.deleteCheckList);

// Use this route only for while development purpose
router.route('/').delete(auth(), checkListController.deleteAllCheckList);

module.exports = router;
