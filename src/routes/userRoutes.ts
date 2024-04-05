import { Router } from "express";
import {
  addUser,
  allUsers,
  deleteUser,
  getUser,
  login,
  logout,
  register,
  updateProfileAdminSecurity,
  updateProfileBasic,
  updateProfileSecurity,
  usersByService,
} from "../controllers/userController";
import {
  addUserSchema,
  userSchema,
  loginUserValidationSchema,
  registerUserValidationSchema,
  updateProfileAdminSecuritySchema,
  updateProfileBasicSchema,
  updateProfileSecuritySchema,
  allUsersValidationSchema,
  usersByServiceValidationSchema,
} from "../validationSchemas/users";
import { isAdmin, isAuth, isDeputy, isManager, isSenior } from "../utils/auth";

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
  "/update-profile-security/:id",
  isAuth,
  isManager,
  updateProfileSecuritySchema,
  updateProfileSecurity
);
userRoutes.put(
  "/update-profile-admin-security/:id",
  isAuth,
  isAdmin,
  updateProfileAdminSecuritySchema,
  updateProfileAdminSecurity
);
userRoutes.get("/logout", isAuth, logout);
userRoutes.get(
  "/:organizationSlug/:serviceSlug/allUsers",
  allUsersValidationSchema,
  isAuth,
  isDeputy,
  allUsers
);
userRoutes.get(
  "/:organizationSlug/:serviceSlug/usersByService",
  usersByServiceValidationSchema,
  isAuth,
  isSenior,
  usersByService
);
userRoutes.get("/delete/:id", isAuth, isAdmin, userSchema, getUser);
userRoutes.delete("/delete/:id", isAuth, isAdmin, userSchema, deleteUser);
userRoutes.post("/add", isAuth, isManager, addUserSchema, addUser);
export default userRoutes;
