import { check, param } from "express-validator";

export const getServiceValidationSchema = param("slug").isString();

export const createServiceValidationSchema = [
  param("slug", "Organization identifier is required.").isString(),
  check("name", "The service name must contain at least 2 characters.")
    .isString()
    .isLength({ min: 2 }),
  check("address").isString(),
  check("city").isString(),
  check("postalCode").isPostalCode("GB"),
  check("phone").isString(),
  check("isOpen").isBoolean(),
];

export const updateServiceValidationSchema = [
  param("id", "Service identifier is invalid or missing.").isMongoId(),
  check("name", "The service name must contain at least 2 characters.")
    .isString()
    .isLength({ min: 2 }),
  check("address").isString(),
  check("city").isString(),
  check("postalCode").isPostalCode("GB"),
  check("phone").isString(),
  check("isOpen").isBoolean(),
];

export const getServicesValidationSchema = param(
  "slug",
  "Organization identifier is incorrect or missing."
).isString();

export const deleteServicesValidationSchema = param(
  "id",
  "Service identifier is invalid or missing."
).isMongoId();
