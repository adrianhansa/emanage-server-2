import { check, param } from "express-validator";

export const roleValidationSchema = param(
  "id",
  "Please provide a valid id."
).isMongoId();
export const createRoleValidationSchema = [
  check("name", "Please provide a name.").isString(),
  check("colour", "Please select a color.").isString(),
];
export const updateRoleValidationSchema = [
  param("id", "Please provide a valid id.").isMongoId(),
  check("name", "Please provide a name.").isString(),
  check("colour", "Please select a color.").isString(),
];
