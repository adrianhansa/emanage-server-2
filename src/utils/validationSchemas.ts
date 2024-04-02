import { check } from "express-validator";

export const registerUserValidationSchema = [
  check("firstName", "First name is required.").isString(),
  check("lastName", "Last name is required.").isString(),
  check("email", "Email is required.").isEmail(),
  check("password", "Password must have at least 6 characters.").isLength({
    min: 6,
  }),
];

export const loginUserValidationSchema = [
  check("email", "Email is required.").isEmail(),
  check("password", "Password must have at least 6 characters.").isLength({
    min: 6,
  }),
];
