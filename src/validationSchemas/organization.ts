import { check, param } from "express-validator";

export const updateOrganizationValidationSchema = [
  check("name", "Please provide a name for your organization.").isString(),
  check("address").isString().optional(),
  check("city").isString().optional(),
  check("postalCode").optional(),
  check("phone").isString().optional(),
];

export const getOrganizationValidationSchema = param("slug").isString();
