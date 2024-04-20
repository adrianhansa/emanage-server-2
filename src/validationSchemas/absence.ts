import { check, param } from "express-validator";

export const addAbsenceValidationSchema = [
  param("serviceSlug", "Service identifier is missing").isString(),
  check("userId", "User id is missing or invalid").isMongoId(),
  check("startDate", "Start date is required").isDate().toDate(),
  check("endDate").isDate().toDate().optional({ values: "falsy" }),
  check("days").isNumeric(),
  check("notes").isString(),
  check("isLongTerm").isBoolean(),
  check("isBradfordScore").isBoolean(),
  check("isRTWCompleted").isBoolean(),
  check("dateOfRTW")
    .if((value, { req }) => req.body.isRTWCompleted !== true)
    .isDate()
    .toDate(),
];

export const updateAbsenceValidationSchema = [
  param("id", "Absence id is missing or invalid.").isMongoId(),
  check("userId", "User id is missing or invalid").isMongoId(),
  check("startDate", "Start date is required").isDate().toDate(),
  check("endDate").isDate().toDate().optional({ values: "falsy" }),
  check("days").isNumeric(),
  check("notes").isString(),
  check("isLongTerm").isBoolean(),
  check("isBradfordScore").isBoolean(),
  check("dateOfRTW")
    .if((value, { req }) => req.body.isRTWCompleted === true)
    .isDate()
    .toDate(),
];

export const absenceValidationSchema = [
  param("id", "Absence id is missing or invalid.").isMongoId(),
];

export const absencesByServiceAndIntervalValidationSchema = [
  param("serviceSlug", "Service identifier is missing.").isString(),
  check("startDate", "Start date is required").isDate().toDate(),
  check("endDate", "End date is required").isDate().toDate(),
];

export const absencesByEmployeeValidationSchema = [
  param("userId", "User id is missing or invalid").isMongoId(),
  check("startDate", "Start date is required").isDate().toDate(),
  check("endDate").isDate().toDate(),
];
