import { check, param, query } from "express-validator";

export const addWorkShiftValidationSchema = [
  param("serviceSlug", "Service identifier is missing").isString(),
  check("shiftId", "Shift id missing or invalid").isMongoId(),
  check("userId", "Employee id missing or invalid").isMongoId(),
  check("date", "Please enter a date").isDate(),
  check("startTime", "Please ener a start time").isString(),
  check("endTime", "Please ener an end time").isString(),
  check("isTraining").isBoolean(),
  check("isAnnualLeave").isBoolean(),
  check("isAbsence").isBoolean(),
  check("isAdminWork").isBoolean(),
  check("isAgency").isBoolean(),
  check("agencyRate").isFloat(),
  check("notes").isString(),
];

export const updateWorkShiftValidationSchema = [
  param("id", "Record id missing or invalid").isMongoId(),
  param("serviceSlug", "Service identifier is missing").isString(),
  check("shiftId", "Shift id missing or invalid").isMongoId(),
  check("userId", "Employee id missing or invalid").isMongoId(),
  check("date", "Please enter a date").isDate(),
  check("startTime", "Please enter a start time").isString(),
  check("endTime", "Please enter an end time").isString(),
  check("isTraining").isBoolean(),
  check("isAnnualLeave").isBoolean(),
  check("isAbsence").isBoolean(),
  check("isAdminWork").isBoolean(),
  check("isAgency").isBoolean(),
  check("agencyRate").isFloat(),
  check("notes").isString(),
];

export const workShiftValidationSchema = [
  param("id", "Record id missing or invalid").isMongoId(),
];

export const getWorkShiftsValidationSchemaByDate = [
  param("serviceSlug", "Service identifier is required").isString(),
  param("date", "Please enter a date").isDate(),
];

export const getWorkShiftsValidationSchemaByEmployee = [
  param("serviceSlug", "Service identifier is required").isString(),
  param("userId", "Employee id missing or invalid").isMongoId(),
];

export const getWorkShiftsValidationSchemaByInterval = [
  param("serviceSlug", "Service identifier is required").isString(),
  param("startDate", "Start date is required").isString(),
  param("endDate", "End date is required").isString(),
];
