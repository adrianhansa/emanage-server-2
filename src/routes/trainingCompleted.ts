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
  trainingCompletedValidationSchema,
  trainingsCompletedByEmployeeValidationSchema,
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
  trainingsCompletedByService,
  trainingsCompletedByService
);
router.post("/", isAuth, isManager, addTrainingCompleted);
router.put(
  "/:id",
  isAdmin,
  isDeputy,
  updateTrainingCompletedValidationSchema,
  updateTrainingCompleted
);

router.get(
  "/:id",
  isAdmin,
  isDeputy,
  trainingCompletedValidationSchema,
  trainingCompleted
);

router.delete(
  "/:id",
  isAdmin,
  isDeputy,
  trainingCompletedValidationSchema,
  deleteTrainingCompleted
);

export default router;
