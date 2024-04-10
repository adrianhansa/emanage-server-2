import { Router } from "express";
import { isAuth, isDeputy } from "../utils/auth";
import {
  addWorkShiftValidationSchema,
  getWorkShiftsValidationSchemaByDate,
  getWorkShiftsValidationSchemaByEmployee,
  getWorkShiftsValidationSchemaByInterval,
  updateWorkShiftValidationSchema,
  workShiftValidationSchema,
} from "../validationSchemas/workshift";
import {
  createWorkShift,
  deleteWorkShift,
  getWorkShift,
  getWorkShiftsByDate,
  getWorkShiftsByEmployee,
  getWorkShiftsByInterval,
  updateWorkShift,
} from "../controllers/workshift";

const router = Router();

router.post(
  "/:serviceSlug",
  isAuth,
  isDeputy,
  addWorkShiftValidationSchema,
  createWorkShift
);

router.get(
  "/:serviceSlug/:id",
  isAuth,
  isDeputy,
  workShiftValidationSchema,
  getWorkShift
);

router.delete(
  "/:serviceSlug/:id",
  isAuth,
  isDeputy,
  workShiftValidationSchema,
  deleteWorkShift
);

router.put(
  "/:serviceSlug/:id",
  isAuth,
  isDeputy,
  updateWorkShiftValidationSchema,
  updateWorkShift
);

router.get(
  "/:serviceSlug/byInterval/:startDate/:endDate",
  isAuth,
  isDeputy,
  getWorkShiftsValidationSchemaByInterval,
  getWorkShiftsByInterval
);

router.get(
  "/:serviceSlug/byDate/:date/",
  isAuth,
  isDeputy,
  getWorkShiftsValidationSchemaByDate,
  getWorkShiftsByDate
);

router.get(
  "/:serviceSlug/byEmployee/:userId",
  isAuth,
  isDeputy,
  getWorkShiftsValidationSchemaByEmployee,
  getWorkShiftsByEmployee
);

export default router;
