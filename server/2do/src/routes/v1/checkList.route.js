const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checklistValidation = require('../../validations/checklist.validation');
const checklistController = require('../../controllers/checklist.controller');
const { isDocIdExits } = require('../../middlewares/isDocIdExits');

const router = express.Router();

router
  .route('/changeChecklistStatus/:checklistId')
  .patch(auth(), validate(checklistValidation.changeChecklistStatus), checklistController.changeChecklistStatus);

router.route('/allChecklists').post(auth(), validate(checklistValidation.allChecklists), checklistController.allChecklists);

router
  .route('/')
  .post(
    auth(),
    validate(checklistValidation.createChecklist),
    isDocIdExits({ category: true, cardColor: true }),
    checklistController.createChecklist
  )
  .get(auth(), checklistController.getChecklists);

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

// Use this route only for while development purpose
router.route('/').delete(auth(), checklistController.deleteAllChecklist);

module.exports = router;
