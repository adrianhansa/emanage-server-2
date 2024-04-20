import { check, param } from "express-validator";

export const addWorkShiftValidationSchema = [
  param("serviceSlug", "Service identifier is missing").isString(),
  check("shiftId", "Shift id missing or invalid").isMongoId(),
  check("userId", "Employee id missing or invalid").isMongoId(),
  check("date", "Please enter a date").isISO8601().toDate(),
  check("startTime", "Enter a start time").isString().notEmpty(),
  check("endTime", "Please enter an end time").isString().notEmpty(),
  check("isTraining").isBoolean().optional({ values: "falsy" }),
  check("isAnnualLeave").isBoolean(),
  check("isAbsence").isBoolean(),
  check("isAdminWork").isBoolean(),
  check("isAgency").isBoolean(),
  check("agencyRate", "Please enter the agency rate.")
    .if((value, { req }) => req.body.isAgency === true)
    .isFloat(),
  check("agencyId", "Please select an agency")
    .if((value, { req }) => req.body.isAgency === true)
    .isMongoId(),
  check("notes").isString(),
];

export const updateWorkShiftValidationSchema = [
  param("id", "Record id missing or invalid").isMongoId(),
  param("serviceSlug", "Service identifier is missing").isString(),
  check("shiftId", "Shift id missing or invalid").isMongoId(),
  check("userId", "Employee id missing or invalid").isMongoId(),
  check("date", "Please enter a date").isISO8601().toDate(),
  check("startTime", "Enter a start time").isString().notEmpty(),
  check("endTime", "Please enter an end time").isString().notEmpty(),
  check("isTraining").isBoolean(),
  check("isAnnualLeave").isBoolean(),
  check("isAbsence").isBoolean(),
  check("isAdminWork").isBoolean(),
  check("isAgency").isBoolean(),
  check("agencyRate", "Please enter the agency rate.")
    .if((value, { req }) => req.body.isAgency === true)
    .isFloat(),
  check("agencyId", "Please select an agency")
    .if((value, { req }) => req.body.isAgency === true)
    .isMongoId(),
  check("notes").optional({ values: "falsy" }).isString(),
];

export const workShiftValidationSchema = [
  param("id", "Record id missing or invalid").isMongoId(),
];

export const getWorkShiftsValidationSchemaByDate = [
  param("serviceSlug", "Service identifier is required").isString(),
  param("date", "Please provide a date").isString().toDate(),
];

export const getWorkShiftsValidationSchemaByEmployee = [
  param("serviceSlug", "Service identifier is required").isString(),
  param("userId", "Employee id missing or invalid").isMongoId(),
];

export const getWorkShiftsValidationSchemaByInterval = [
  param("serviceSlug", "Service identifier is required").isString(),
  param("startDate", "Start date is required").isString().toDate(),
  param("endDate", "End date is required").isString().toDate(),
];

export const getWorkShiftsValidationSchemaByEmployeeAndByInterval = [
  param("serviceSlug", "Service identifier is required.").isString(),
  param("userId", "Employee id is missing or invalid.").isString(),
  param("startDate", "Start date is required").isString().toDate(),
  param("endDate", "End date is required").isString().toDate(),
];
