import { check, param } from "express-validator";

export const shiftValidationSchema = [
  param("id", "Invalid or missing id.").isMongoId(),
];

export const updateShiftValidationSchema = [
  param("id", "Invalid or missing id.").isMongoId(),
  check("name", "Please provide a name").isString(),
  check("colour", "Please provide a color").isString(),
  check("startTime", "Please enter the start time").isString(),
  check("endTime", "Please enter the end time").isString(),
  check("serviceId", "Please select the service").isMongoId(),
  check("isInUse").isBoolean(),
];

export const createShiftValidationSchema = [
  param("serviceSlug", "Service identifier is missing").isString(),
  check("name", "Please provide a name").isString(),
  check("colour", "Please provide a color").isString(),
  check("startTime", "Please enter the start time").isString(),
  check("endTime", "Please enter the end time").isString(),
  check("isInUse").isBoolean(),
];

export const getShiftsValidationSchema = [
  param("serviceSlug", "Service identifier is missing").isString(),
];
