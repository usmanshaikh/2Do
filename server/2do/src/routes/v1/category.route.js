const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

const router = express.Router();

// Admin Route
router.route('/deleteAllCategories').delete(auth('deleteAllCategories'), categoryController.deleteAllCategories);
router.route('/getAllCategories').get(auth('getAllCategories'), categoryController.getAllCategories);

router.route('/allCategories').get(auth(), validate(categoryValidation.allCategories), categoryController.allCategories);
router.route('/categoryWithTaskAndChecklistCount').get(auth(), categoryController.categoryWithTaskAndChecklistCount);
router
  .route('/createCategory')
  .post(
    auth(),
    validate(categoryValidation.createCategory),
    isDocIdExits({ cardColor: true }),
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
