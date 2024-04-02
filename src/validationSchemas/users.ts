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

export const updateProfileBasicSchema = [
  check("email", "Email is required.").isEmail(),
  check("phone", "Please provide a valid UK mobile phone number").isMobilePhone(
    "en-GB"
  ),
  check("password", "Password must have at least 6 characters.").isLength({
    min: 6,
  }),
  check("address").isString(),
];

export const updateProfileSecuritySchema = [
  check("email", "Email is required.").isEmail(),
  check("phone", "Please provide a valid UK mobile phone number").isMobilePhone(
    "en-GB"
  ),
  check("password", "Password must have at least 6 characters.").isLength({
    min: 6,
  }),
  check("address").isString(),
  check("firstName").isString(),
  check("lastName").isString(),
  check("payrollNumber").isString(),
  check("isDriver").isBoolean(),
  check("isActive").isBoolean(),
  check("isInProbation").isBoolean(),
  check(
    "contractHours",
    "The maximum number of contract hours per week cannot exceed 40."
  ).isInt({ max: 40 }),
  check(
    "roleId",
    "Please provide a valid id for the selected role"
  ).isMongoId(),
  check(
    "serviceId",
    "Please provide a valid id for the selected service"
  ).isMongoId(),
];

export const updateProfileAdminSecuritySchema = [
  check("email", "Email is required.").isEmail(),
  check("phone", "Please provide a valid UK mobile phone number").isMobilePhone(
    "en-GB"
  ),
  check("password", "Password must have at least 6 characters.").isLength({
    min: 6,
  }),
  check("address").isString(),
  check("firstName").isString(),
  check("lastName").isString(),
  check("payrollNumber").isString(),
  check("isDriver").isBoolean(),
  check("isActive").isBoolean(),
  check("isInProbation").isBoolean(),
  check(
    "contractHours",
    "The maximum number of contract hours per week cannot exceed 40."
  ).isInt({ max: 40 }),
  check(
    "roleId",
    "Please provide a valid id for the selected role"
  ).isMongoId(),
  check(
    "serviceId",
    "Please provide a valid id for the selected service"
  ).isMongoId(),
  check("isAdmin").isBoolean(),
  check("accessLevel").isInt({ min: 1, max: 5 }),
];
