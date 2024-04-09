import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";

export const trainingsCompletedInOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingsCompleted = await prisma.trainingCompleted.findMany({
      where: { organizationId: req.user?.organizationId },
    });
    res.status(200).json({ trainingsCompleted });
  } catch (error) {
    next(error);
  }
};

export const trainingsCompletedByTraining = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingsCompleted = await prisma.trainingCompleted.findMany({
      where: {
        organizationId: req.user?.organizationId,
        trainingId: req.params.trainingId,
      },
    });
    res.status(200).json({ trainingsCompleted });
  } catch (error) {
    next(error);
  }
};

export const trainingsCompletedByEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingsCompleted = await prisma.trainingCompleted.findMany({
      where: {
        organizationId: req.user?.organizationId,
        userId: req.params.userId,
      },
    });
    res.status(200).json({ trainingsCompleted });
  } catch (error) {
    next(error);
  }
};

export const trainingsCompletedByService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingsCompleted = await prisma.trainingCompleted.findMany({
      where: {
        organizationId: req.user?.organizationId,
        serviceId: req.params.serviceId,
      },
    });
    res.status(200).json({ trainingsCompleted });
  } catch (error) {
    next(error);
  }
};

export const trainingCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingsCompleted = await prisma.trainingCompleted.findUnique({
      where: { organizationId: req.user?.organizationId, id: req.params.id },
    });
    res.status(200).json({ trainingsCompleted });
  } catch (error) {
    next(error);
  }
};

export const addTrainingCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingCompleted = await prisma.trainingCompleted.create({
      data: { organizationId: req.user?.organizationId, ...req.body },
    });
    res.status(201).json({ trainingCompleted });
  } catch (error) {
    next(error);
  }
};

export const updateTrainingCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingCompleted = await prisma.trainingCompleted.update({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
      data: { ...req.body },
    });
    if (!trainingCompleted) throw createHttpError(404, "Record not found.");
    res.status(201).json({ trainingCompleted });
  } catch (error) {
    next(error);
  }
};

export const deleteTrainingCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    }
    const trainingCompleted = await prisma.trainingCompleted.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!trainingCompleted) throw createHttpError(404, "Record not found.");
    await prisma.trainingCompleted.delete({
      where: { id: trainingCompleted.id },
    });
    res.status(200).json({ message: "Record deleted" });
  } catch (error) {
    next(error);
  }
};
