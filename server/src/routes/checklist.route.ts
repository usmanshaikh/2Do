import express from 'express';
import { checklistController } from '../controllers';
import { validate, isEntityExists, authenticateJWT } from '../middlewares';
import { checklistValidation } from '../validations';

const router = express.Router();

router.patch(
  '/change-status/:checklistId',
  authenticateJWT,
  validate(checklistValidation.changeChecklistStatus),
  checklistController.changeChecklistStatus,
);
router.post('/all', authenticateJWT, validate(checklistValidation.allChecklists), checklistController.allChecklists);
router.post(
  '/create',
  authenticateJWT,
  validate(checklistValidation.createChecklist),
  isEntityExists({ category: true }),
  checklistController.createChecklist,
);
router
  .route('/:checklistId')
  .get(authenticateJWT, validate(checklistValidation.getChecklist), checklistController.getChecklist)
  .patch(
    authenticateJWT,
    validate(checklistValidation.updateChecklist),
    isEntityExists({ category: true }),
    checklistController.updateChecklist,
  )
  .delete(authenticateJWT, validate(checklistValidation.deleteChecklist), checklistController.deleteChecklist);

export default router;
