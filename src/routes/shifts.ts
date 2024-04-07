import { Router } from "express";
import { isAuth, isDeputy } from "../utils/auth";
import {
  createShiftValidationSchema,
  getShiftsValidationSchema,
  shiftValidationSchema,
  updateShiftValidationSchema,
} from "../validationSchemas/shift";
import {
  createShift,
  deleteShift,
  getShift,
  getShifts,
  updateShift,
} from "../controllers/shifts";

const router = Router();

router.get(
  "/:serviceSlug",
  isAuth,
  isDeputy,
  getShiftsValidationSchema,
  getShifts
);
router.post(
  "/:serviceSlug",
  isAuth,
  isDeputy,
  createShiftValidationSchema,
  createShift
);
router.get("/:id", isAuth, isDeputy, shiftValidationSchema, getShift);
router.put("/:id", isAuth, isDeputy, updateShiftValidationSchema, updateShift);
router.delete("/:id", isAuth, isDeputy, shiftValidationSchema, deleteShift);

export default router;
