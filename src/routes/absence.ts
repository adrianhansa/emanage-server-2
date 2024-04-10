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

router.get(
  "/absencesByEmployee",
  isAuth,
  isDeputy,
  absencesByEmployeeValidationSchema,
  getAbsencesByEmployeeAndInterval
);

router.get(
  "/absencesByService",
  isAuth,
  isDeputy,
  absencesByServiceAndIntervalValidationSchema,
  getAbsencesByServiceAndInterval
);

router.get("/:id", isAuth, isSenior, absenceValidationSchema, getAbsence);
router.delete("/:id", isAuth, isDeputy, absenceValidationSchema, deleteAbsence);
router.put(
  "/:id",
  isAuth,
  isSenior,
  updateAbsenceValidationSchema,
  updateAbsence
);
router.post("/", isAuth, isSenior, addAbsenceValidationSchema, addAbsence);

export default router;
