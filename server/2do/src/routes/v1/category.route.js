import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import categoryValidation from '../../validations/category.validation.js';
import categoryController from '../../controllers/category.controller.js';
import { isDocIdExits } from '../../middlewares/isDocIdExits.js';

const router = express.Router();

router.route('/all').get(auth(), validate(categoryValidation.allCategories), categoryController.allCategories);
router.route('/with-task-and-checklist-count').get(auth(), categoryController.categoryWithTaskAndChecklistCount);
router
  .route('/create')
  .post(
    auth(),
    validate(categoryValidation.createCategory),
    isDocIdExits({ categoryName: true }),
    categoryController.createCategory,
  );
// Update, Delete By ID
router
  .route('/:categoryId')
  .patch(auth(), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth(), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

export default router;
