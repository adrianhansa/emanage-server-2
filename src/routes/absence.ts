import { Router } from "express";
import { isAuth, isDeputy, isSenior } from "../utils/auth";
import {
  absenceValidationSchema,
  absencesByEmployeeValidationSchema,
  absencesByServiceAndIntervalValidationSchema,
  addAbsenceValidationSchema,
  updateAbsenceValidationSchema,
} from "../validationSchemas/absence";
import {
  addAbsence,
  deleteAbsence,
  getAbsence,
  getAbsencesByEmployeeAndInterval,
  getAbsencesByServiceAndInterval,
  updateAbsence,
} from "../controllers/absence";

const router = Router();

router.post(
  "/:serviceSlug",
  isAuth,
  isSenior,
  addAbsenceValidationSchema,
  addAbsence
);

router.put(
  "/:id",
  isAuth,
  isSenior,
  updateAbsenceValidationSchema,
  updateAbsence
);

router.get("/:id", isAuth, isSenior, absenceValidationSchema, getAbsence);

router.delete("/:id", isAuth, isDeputy, absenceValidationSchema, deleteAbsence);

router.post(
  "/absencesByEmployee/:userId",
  isAuth,
  isDeputy,
  absencesByEmployeeValidationSchema,
  getAbsencesByEmployeeAndInterval
);

router.post(
  "/absencesByService/:serviceSlug",
  isAuth,
  isDeputy,
  absencesByServiceAndIntervalValidationSchema,
  getAbsencesByServiceAndInterval
);

export default router;
