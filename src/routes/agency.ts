import { Router } from "express";
import { isAuth, isDeputy, isSenior } from "../utils/auth";
import {
  agencyValidationSchema,
  createAgencyValidationSchema,
  updateAgencyValidationSchema,
} from "../validationSchemas/agency";
import {
  addAgency,
  agencies,
  deleteAgency,
  getAgency,
  updateAgency,
} from "../controllers/agency";

const router = Router();

router.get("/", isAuth, isSenior, agencies);
router.post("/", isAuth, isDeputy, createAgencyValidationSchema, addAgency);
router.get("/:id", isAuth, isSenior, agencyValidationSchema, getAgency);
router.put(
  "/:id",
  isAuth,
  isDeputy,
  updateAgencyValidationSchema,
  updateAgency
);
router.delete("/:id", isAuth, isDeputy, agencyValidationSchema, deleteAgency);

export default router;
