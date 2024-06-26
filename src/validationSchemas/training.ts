import { check, param } from "express-validator";

export const createTrainingValidationSchema = [
  check("name", "Please provide a name").notEmpty().isString(),
  check("isMandatory").isBoolean(),
  check("isOnline").isBoolean(),
  check("isSpecialist").isBoolean(),
  check("monthsValid").isNumeric(),
];

export const updateTrainingValidationSchema = [
  param("id", "Missing or invalid training id").isMongoId(),
  check("name", "Please provide a name").notEmpty().isString(),
  check("isMandatory").isBoolean(),
  check("isOnline").isBoolean(),
  check("isSpecialist").isBoolean(),
  check("monthsValid").isNumeric(),
];

export const trainingValidationSchema = [
  param("id", "Missing or invalid training id").isMongoId(),
];
