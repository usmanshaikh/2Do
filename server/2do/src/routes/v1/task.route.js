const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

const router = express.Router();

router
  .route('/changeTaskStatus/:taskId')
  .patch(auth(), validate(taskValidation.changeTaskStatus), taskController.changeTaskStatus);

router
  .route('/')
  .post(
    auth(),
    validate(taskValidation.createTask),
    isDocIdExits({ category: true, cardColor: true }),
    taskController.createTask
  )
  .get(auth(), taskController.getTasks);

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

// Use this route only for while development purpose
router.route('/').delete(auth(), taskController.deleteAllTask);

module.exports = router;
