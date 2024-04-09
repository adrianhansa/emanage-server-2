import { check, param } from "express-validator";

export const createAgencyValidationSchema = [
  check("name", "Please provide a name").isString(),
];

export const updateAgencyValidationSchema = [
  param("id", "Missing or invalid agency id."),
  check("name", "Please provide a name").isString(),
];

export const agencyValidationSchema = [
  param("id", "Missing or invalid agency id."),
];
