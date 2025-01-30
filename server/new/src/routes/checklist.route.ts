import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import checklistValidation from '../../validations/checklist.validation.js';
import checklistController from '../../controllers/checklist.controller.js';
import { isEntityExists } from '../../middlewares/isEntityExists.js';

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
    isEntityExists({ category: true }),
    checklistController.createChecklist,
  );

// Get, Update, Delete By ID
router
  .route('/:checklistId')
  .get(auth(), validate(checklistValidation.getChecklist), checklistController.getChecklist)
  .patch(
    auth(),
    validate(checklistValidation.updateChecklist),
    isEntityExists({ category: true }),
    checklistController.updateChecklist,
  )
  .delete(auth(), validate(checklistValidation.deleteChecklist), checklistController.deleteChecklist);

export default router;
