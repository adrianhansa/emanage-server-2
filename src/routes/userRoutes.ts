import { Router } from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "../utils/validationSchemas";
import { isAuth } from "../utils/auth";

const userRoutes = Router();

userRoutes.post("/register", registerUserValidationSchema, register);
userRoutes.post("/login", loginUserValidationSchema, login);
userRoutes.put("/update-profile", isAuth, updateProfile);
userRoutes.get("/logout", isAuth, logout);

export default userRoutes;
