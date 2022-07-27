const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

const router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(categoryValidation.createCategory),
    isDocIdExits({ cardColor: true }),
    categoryController.createCategory
  )
  .get(auth(), validate(categoryValidation.getCategory), categoryController.getAllCategory);

router
  .route('/withTaskAndCheckListCount')
  .get(auth(), validate(categoryValidation.getCategory), categoryController.getAllCategory);

router
  .route('/:categoryId')
  .patch(
    auth(),
    validate(categoryValidation.updateCategory),
    isDocIdExits({ cardColor: true }),
    categoryController.updateCategory
  )
  .delete(auth(), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

router.route('/categoryWithTaskAndCheckListCount').get(auth(), categoryController.categoryWithTaskAndCheckListCount);

// Use this route only for while development purpose
router.route('/').delete(auth(), categoryController.deleteAllCategory);

module.exports = router;
