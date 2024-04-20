import { Router } from "express";
import { isAdmin, isAuth, isDeputy, isManager } from "../utils/auth";
import {
  addTrainingCompleted,
  deleteTrainingCompleted,
  trainingCompleted,
  trainingsCompletedByEmployee,
  trainingsCompletedByService,
  trainingsCompletedByTraining,
  trainingsCompletedInOrganization,
  updateTrainingCompleted,
} from "../controllers/trainingCompleted";
import {
  addTrainingCompletedValidationSchema,
  trainingCompletedValidationSchema,
  trainingsCompletedByEmployeeValidationSchema,
  trainingsCompletedByServiceValidationSchema,
  trainingsCompletedByTrainingValidationSchema,
  updateTrainingCompletedValidationSchema,
} from "../validationSchemas/trainingCompleted";

const router = Router();
router.get("/", isAuth, isAdmin, trainingsCompletedInOrganization);
router.get(
  "/byEmployee/:userId",
  isAuth,
  isDeputy,
  trainingsCompletedByEmployeeValidationSchema,
  trainingsCompletedByEmployee
);
router.get(
  "/byTraining/:trainingId",
  isAuth,
  isDeputy,
  trainingsCompletedByTrainingValidationSchema,
  trainingsCompletedByTraining
);
router.get(
  "/byService/:serviceId",
  isAuth,
  isDeputy,
  trainingsCompletedByServiceValidationSchema,
  trainingsCompletedByService
);
router.post(
  "/",
  isAuth,
  isManager,
  addTrainingCompletedValidationSchema,
  addTrainingCompleted
);
router.put(
  "/:id",
  isAuth,
  isDeputy,
  updateTrainingCompletedValidationSchema,
  updateTrainingCompleted
);

router.get(
  "/:id",
  isAuth,
  isDeputy,
  trainingCompletedValidationSchema,
  trainingCompleted
);

router.delete(
  "/:id",
  isAuth,
  isDeputy,
  trainingCompletedValidationSchema,
  deleteTrainingCompleted
);

export default router;
