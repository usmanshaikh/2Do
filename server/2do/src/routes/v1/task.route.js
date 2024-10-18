import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import taskValidation from '../../validations/task.validation.js';
import taskController from '../../controllers/task.controller.js';
import { isDocIdExits } from '../../middlewares/isDocIdExits.js';

const router = express.Router();

router
  .route('/change-status/:taskId')
  .patch(auth(), validate(taskValidation.changeTaskStatus), taskController.changeTaskStatus);

router.route('/all').post(auth(), validate(taskValidation.allTasks), taskController.allTasks);

router
  .route('/create')
  .post(
    auth(),
    validate(taskValidation.createTask),
    isDocIdExits({ category: true, cardColor: true }),
    taskController.createTask,
  );

// Get, Update, Delete By ID
router
  .route('/:taskId')
  .get(auth(), validate(taskValidation.getTask), taskController.getTask)
  .patch(
    auth(),
    validate(taskValidation.updateTask),
    isDocIdExits({ category: true, cardColor: true }),
    taskController.updateTask,
  )
  .delete(auth(), validate(taskValidation.deleteTask), taskController.deleteTask);

export default router;
