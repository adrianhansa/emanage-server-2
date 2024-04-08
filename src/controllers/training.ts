import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";

export const trainings = async (
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
    const trainings = await prisma.training.findMany({
      where: { organizationId: req.user?.organizationId },
    });
    res.status(200).json({ trainings });
  } catch (error) {
    next(error);
  }
};

export const createTraining = async (
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
    const training = await prisma.training.create({
      data: { organizationId: req.user?.organizationId, ...req.body },
    });
    res.status(201).json({ training });
  } catch (error) {
    next(error);
  }
};

export const training = async (
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
    const training = await prisma.training.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!training) throw createHttpError(404, "Training not found");
    res.status(200).json({ training });
  } catch (error) {
    next(error);
  }
};

export const updateTraining = async (
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
    const training = await prisma.training.update({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
      data: { ...req.body },
    });
    if (!training) throw createHttpError(404, "Training not found.");
    res.status(201).json({ training });
  } catch (error) {
    next(error);
  }
};

export const deleteTraining = async (
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
    const training = await prisma.training.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!training) throw createHttpError(404, "Training not found.");
    await prisma.training.delete({
      where: { id: training.id, organizationId: req.user?.organizationId },
    });
    res.status(200).json({ message: "Training deleted" });
  } catch (error) {
    next(error);
  }
};
