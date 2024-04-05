import { Router } from "express";
import { isAdmin, isAuth } from "../utils/auth";
import {
  getOrganization,
  updateOrganization,
} from "../controllers/organization";
import { updateOrganizationValidationSchema } from "../validationSchemas/organization";

const router = Router();

router.get("/:slug", isAuth, getOrganization);
router.put(
  "/:id",
  updateOrganizationValidationSchema,
  isAuth,
  isAdmin,
  updateOrganization
);

export default router;
