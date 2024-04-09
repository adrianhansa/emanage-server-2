import { check, param } from "express-validator";

export const addTrainingCompletedValidationSchema = [
  check("userId", "Employee id is missing or invalid").isMongoId(),
  check("trainingId", "Training id is missing or invalid").isMongoId(),
  check("serviceId", "Service id is missing or invalid").isMongoId(),
  check(
    "dateCompleted",
    "Please enter the date when this trainig was completed"
  ).isDate(),
];

export const updateTrainingCompletedValidationSchema = [
  param("id", "Record id is missing or invalid").isMongoId(),
  check("userId", "Employee id is missing or invalid").isMongoId(),
  check("trainingId", "Training id is missing or invalid").isMongoId(),
  check("serviceId", "Service id is missing or invalid").isMongoId(),
  check(
    "dateCompleted",
    "Please enter the date when this trainig was completed"
  ).isDate(),
];

export const trainingCompletedValidationSchema = [
  param("id", "Record id is missing or invalid").isMongoId(),
];

export const trainingsCompletedByServiceValidationSchema = [
  param("serviceId", "Record id is missing or invalid").isMongoId(),
];

export const trainingsCompletedByEmployeeValidationSchema = [
  param("userId", "Record id is missing or invalid").isMongoId(),
];

export const trainingsCompletedByTrainingValidationSchema = [
  param("trainingId", "Record id is missing or invalid").isMongoId(),
];
