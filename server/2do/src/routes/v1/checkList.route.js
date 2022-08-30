const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checklistValidation = require('../../validations/checklist.validation');
const checklistController = require('../../controllers/checklist.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

const router = express.Router();

router
  .route('/change-status/:checklistId')
  .patch(auth(), validate(checklistValidation.changeChecklistStatus), checklistController.changeChecklistStatus);

router.route('/all').post(auth(), validate(checklistValidation.allChecklists), checklistController.allChecklists);

router
  .route('/create')
  .post(
    auth(),
    validate(checklistValidation.createChecklist),
    isDocIdExits({ category: true, cardColor: true }),
    checklistController.createChecklist
  );

// Get, Update, Delete By ID
router
  .route('/:checklistId')
  .get(auth(), validate(checklistValidation.getChecklist), checklistController.getChecklist)
  .patch(
    auth(),
    validate(checklistValidation.updateChecklist),
    isDocIdExits({ category: true, cardColor: true }),
    checklistController.updateChecklist
  )
  .delete(auth(), validate(checklistValidation.deleteChecklist), checklistController.deleteChecklist);

module.exports = router;
