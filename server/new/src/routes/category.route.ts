import express from 'express';
import { authenticateJWT, isEntityExists, validate } from '../middlewares';
import { categoryController } from '../controllers';
import { categoryValidation } from '../validations';

const router = express.Router();

router.get('/all', authenticateJWT, validate(categoryValidation.allCategories), categoryController.allCategories);
router.get('/with-task-and-checklist-count', authenticateJWT, categoryController.categoryWithTaskAndChecklistCount);
router.post(
  '/create',
  authenticateJWT,
  validate(categoryValidation.createCategory),
  isEntityExists({ categoryName: true }),
  categoryController.createCategory,
);
router
  .route('/:categoryId')
  .patch(authenticateJWT, validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(authenticateJWT, validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

export default router;
