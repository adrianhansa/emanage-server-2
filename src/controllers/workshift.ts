import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";
import calculateShiftDuration from "../utils/shiftDuration";

export const createWorkShift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    const service = await prisma.service.findFirst({
      where: {
        organizationId: req.user?.organizationId,
        slug: req.params.slug,
      },
    });
    if (!service) throw createHttpError(404, "Service not found");
    const duration = calculateShiftDuration(
      req.body.startTime,
      req.body.endTime
    );
    const workShift = await prisma.workShift.create({
      data: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        duration,
        ...req.body,
      },
    });
    res.status(201).json({ workShift });
  } catch (error) {
    next(error);
  }
};

export const getWorkShift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    const workShift = await prisma.workShift.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!workShift) throw createHttpError(404, "Record not found.");
    res.status(200).json({ workShift });
  } catch (error) {
    next(error);
  }
};

export const updateWorkShift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    const duration = calculateShiftDuration(
      req.body.startTime,
      req.body.endTime
    );
    const workShift = await prisma.workShift.update({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
      data: { duration, ...req.body },
    });
    if (!workShift) throw createHttpError(404, "Record not found");
    res.status(201).json({ workShift });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkShift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    const workShift = await prisma.workShift.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!workShift) throw createHttpError(404, "Record not found.");
    await prisma.workShift.delete({ where: { id: workShift.id } });
    res.status(200).json({ message: "Record deleted" });
  } catch (error) {
    next(error);
  }
};

export const getWorkShiftsByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    const service = await prisma.service.findFirst({
      where: {
        slug: req.params.serviceSlug,
        organizationId: req.user?.organizationId,
      },
    });
    if (!service) throw createHttpError(404, "Service not found");
    const workShifts = await prisma.workShift.findMany({
      where: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        date: req.params.date,
      },
    });
    res.status(200).json({ workShifts });
  } catch (error) {
    next(error);
  }
};

export const getWorkShiftsByEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    const service = await prisma.service.findFirst({
      where: {
        slug: req.params.serviceSlug,
        organizationId: req.user?.organizationId,
      },
    });
    if (!service) throw createHttpError(404, "Service not found");
    const workShifts = await prisma.workShift.findMany({
      where: {
        organizationId: req.user?.organizationId,
        userId: req.params.userId,
      },
    });
    res.status(200).json({ workShifts });
  } catch (error) {
    next(error);
  }
};

export const getWorkShiftsByInterval = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    const service = await prisma.service.findFirst({
      where: {
        slug: req.params.serviceSlug,
        organizationId: req.user?.organizationId,
      },
    });
    if (!service) throw createHttpError(404, "Service not found");
    const workShifts = await prisma.workShift.findMany({
      where: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        date: { lte: req.params.endDate, gte: req.params.startDate },
      },
    });
    res.status(200).json({ workShifts });
  } catch (error) {
    next(error);
  }
};
