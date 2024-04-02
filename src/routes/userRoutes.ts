import { Router } from "express";
import {
  login,
  logout,
  register,
  updateProfileAdminSecurity,
  updateProfileBasic,
  updateProfileSecurity,
} from "../controllers/userController";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
  updateProfileAdminSecuritySchema,
  updateProfileBasicSchema,
  updateProfileSecuritySchema,
} from "../validationSchemas/users";
import { isAdmin, isAuth, isManager } from "../utils/auth";

const userRoutes = Router();

userRoutes.post("/register", registerUserValidationSchema, register);
userRoutes.post("/login", loginUserValidationSchema, login);
userRoutes.put(
  "/update-profile-basic",
  isAuth,
  updateProfileBasicSchema,
  updateProfileBasic
);
userRoutes.put(
  "/update-profile-security",
  isManager,
  updateProfileSecuritySchema,
  updateProfileSecurity
);
userRoutes.put(
  "/update-profile-admin-security",
  isAdmin,
  updateProfileAdminSecuritySchema,
  updateProfileAdminSecurity
);
userRoutes.get("/logout", isAuth, logout);

export default userRoutes;
