import { Router } from "express";
import { isAdmin, isAuth, isManager } from "../utils/auth";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controllers/role";
import {
  createRoleValidationSchema,
  roleValidationSchema,
  updateRoleValidationSchema,
} from "../validationSchemas/role";

const router = Router();

router.get("/", isAuth, isManager, getRoles);
router.get("/:id", isAuth, isManager, roleValidationSchema, getRole);
router.post("/", isAuth, isAdmin, createRoleValidationSchema, createRole);
router.put("/:id", isAuth, isAdmin, updateRoleValidationSchema, updateRole);
router.delete("/:id", isAuth, isAdmin, roleValidationSchema, deleteRole);

export default router;
