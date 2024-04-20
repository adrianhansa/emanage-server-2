import { check, param } from "express-validator";

export const createAgencyValidationSchema = [
  check("name", "Please provide a name of at least 2 characters.")
    .isString()
    .isLength({ min: 2 }),
];

export const updateAgencyValidationSchema = [
  param("id", "Missing or invalid agency id."),
  check("name", "Please provide a name of at least 2 characters.")
    .isString()
    .isLength({ min: 2 }),
];

export const agencyValidationSchema = [
  param("id", "Missing or invalid agency id."),
];
