const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(auth(), validate(categoryValidation.getCategory), categoryController.getAllCategory);

router
  .route('/:categoryId')
  .patch(auth(), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth(), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;
