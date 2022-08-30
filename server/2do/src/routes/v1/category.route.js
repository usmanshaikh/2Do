const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

const router = express.Router();

router.route('/all').get(auth(), validate(categoryValidation.allCategories), categoryController.allCategories);
router.route('/with-task-and-checklist-count').get(auth(), categoryController.categoryWithTaskAndChecklistCount);
router
  .route('/create')
  .post(
    auth(),
    validate(categoryValidation.createCategory),
    isDocIdExits({ categoryName: true, cardColor: true }),
    categoryController.createCategory
  );
// Update, Delete By ID
router
  .route('/:categoryId')
  .patch(
    auth(),
    validate(categoryValidation.updateCategory),
    isDocIdExits({ cardColor: true }),
    categoryController.updateCategory
  )
  .delete(auth(), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;
