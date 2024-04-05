import { Router } from "express";
import { isAdmin, isAuth, isDeputy, isManager, isRcw } from "../utils/auth";
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
} from "../controllers/service";
import {
  createServiceValidationSchema,
  deleteServicesValidationSchema,
  getServiceValidationSchema,
  getServicesValidationSchema,
  updateServiceValidationSchema,
} from "../validationSchemas/service";

const router = Router();

router.get(
  "/services",
  isAuth,
  isDeputy,
  getServicesValidationSchema,
  getServices
);
router.get("/:slug", isAuth, isRcw, getServiceValidationSchema, getService);
router.post("/", isAuth, isAdmin, createServiceValidationSchema, createService);
router.put(
  "/:id",
  isAuth,
  isManager,
  updateServiceValidationSchema,
  updateService
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  deleteServicesValidationSchema,
  deleteService
);

export default router;
