const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

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
    taskController.createTask
  );

// Get, Update, Delete By ID
router
  .route('/:taskId')
  .get(auth(), validate(taskValidation.getTask), taskController.getTask)
  .patch(
    auth(),
    validate(taskValidation.updateTask),
    isDocIdExits({ category: true, cardColor: true }),
    taskController.updateTask
  )
  .delete(auth(), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;
