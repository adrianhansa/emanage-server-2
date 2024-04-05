import { check, param } from "express-validator";

export const updateOrganizationValidationSchema = [
  check("name", "Please provide a name for your organization.").isString(),
  check("address").isString(),
  check("city").isString(),
  check("postalCode").isPostalCode("GB"),
  check("phone").isString(),
];

export const getOrganizationValidationSchema = param("slug").isString();
