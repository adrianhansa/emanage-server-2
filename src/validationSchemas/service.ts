import { check, param } from "express-validator";

export const getServiceValidationSchema = param("slug").isString();

export const createServiceValidationSchema = [
  check("name", "The service name must contain at least 2 characters.")
    .isString()
    .isLength({ min: 2 }),
  check("address").isString().optional({ values: "falsy" }),
  check("city").isString().optional({ values: "falsy" }),
  check("postalCode").isPostalCode("GB").optional({ values: "falsy" }),
  check("phone").isString().optional({ values: "falsy" }),
  check("isOpen").isBoolean().optional({ values: "falsy" }),
];

export const updateServiceValidationSchema = [
  param("id", "Service identifier is invalid or missing.").isMongoId(),
  check("name", "The service name must contain at least 2 characters.")
    .isString()
    .isLength({ min: 2 }),
  check("address").isString().optional({ values: "falsy" }),
  check("city").isString(),
  check("postalCode").isPostalCode("GB").optional({ values: "falsy" }),
  check("phone").isString().optional({ values: "falsy" }),
  check("isOpen").isBoolean().optional({ values: "falsy" }),
];

export const deleteServicesValidationSchema = param(
  "id",
  "Service identifier is invalid or missing."
).isMongoId();
