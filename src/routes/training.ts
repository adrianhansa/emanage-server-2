import { Router } from "express";
import {
  createTrainingValidationSchema,
  trainingValidationSchema,
  updateTrainingValidationSchema,
} from "../validationSchemas/training";
import {
  createTraining,
  deleteTraining,
  training,
  trainings,
  updateTraining,
} from "../controllers/training";
import { isAuth, isDeputy, isManager } from "../utils/auth";

const router = Router();
router.get("/", isAuth, isDeputy, trainings);
router.post(
  "/",
  isAuth,
  isManager,
  createTrainingValidationSchema,
  createTraining
);

router.get("/:id", isAuth, isManager, trainingValidationSchema, training);
router.put(
  "/:id",
  isAuth,
  isManager,
  updateTrainingValidationSchema,
  updateTraining
);
router.delete(
  "/:id",
  isAuth,
  isManager,
  trainingValidationSchema,
  deleteTraining
);

export default router;
