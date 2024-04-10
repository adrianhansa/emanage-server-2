import { check, param } from "express-validator";

export const addAbsenceValidationSchema = [
  param("serviceSlug", "Service identifier is missing").isString(),
  check("userId", "User id is missing or invalid").isMongoId(),
  check("startDate", "Start date is required").isDate(),
  check("endDate").isDate(),
  check("days").isNumeric(),
  check("notes").isString(),
  check("isLongTerm").isBoolean(),
  check("isBradfordScore").isBoolean(),
  check("isRTWCompleted").isBoolean(),
  check("DateOfRTW").isDate(),
];

export const updateAbsenceValidationSchema = [
  param("serviceSlug", "Service identifier is missing.").isString(),
  param("id", "Absence id is missing or invalid.").isMongoId(),
  check("userId", "User id is missing or invalid").isMongoId(),
  check("startDate", "Start date is required").isDate(),
  check("endDate").isDate(),
  check("days").isNumeric(),
  check("notes").isString(),
  check("isLongTerm").isBoolean(),
  check("isBradfordScore").isBoolean(),
];

export const absenceValidationSchema = [
  param("id", "Absence id is missing or invalid.").isMongoId(),
];

export const absencesByServiceAndIntervalValidationSchema = [
  param("serviceSlug", "Service identifier is missing.").isString(),
  check("startDate", "Start date is required").isDate(),
  check("endDate").isDate(),
];

export const absencesByEmployeeValidationSchema = [
  check("userId", "User id is missing or invalid").isMongoId(),
  check("startDate", "Start date is required").isDate(),
  check("endDate").isDate(),
];
