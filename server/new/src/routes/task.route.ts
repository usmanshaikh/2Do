import express from 'express';
import { taskController } from '../controllers';
import { validate, isEntityExists, authenticateJWT } from '../middlewares';
import { taskValidation } from '../validations';

const router = express.Router();

router.patch(
  '/change-status/:taskId',
  authenticateJWT,
  validate(taskValidation.changeTaskStatus),
  taskController.changeTaskStatus,
);
router.post('/all', authenticateJWT, validate(taskValidation.allTasks), taskController.allTasks);
router.post(
  '/create',
  authenticateJWT,
  validate(taskValidation.createTask),
  isEntityExists({ category: true }),
  taskController.createTask,
);
router
  .route('/:taskId')
  .get(authenticateJWT, validate(taskValidation.getTask), taskController.getTask)
  .patch(authenticateJWT, validate(taskValidation.updateTask), isEntityExists({ category: true }), taskController.updateTask)
  .delete(authenticateJWT, validate(taskValidation.deleteTask), taskController.deleteTask);

export default router;
