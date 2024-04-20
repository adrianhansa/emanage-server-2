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
    const date = new Date(req.params.date);
    const workShifts = await prisma.workShift.findMany({
      where: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        date: {
          gte: req.params.date,
          lt: new Date(date.setDate(date.getDate() + 1)), //less then next day
        },
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
    const endDate = new Date(req.params.endDate);
    const workShifts = await prisma.workShift.findMany({
      where: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        date: {
          gte: req.params.startDate,
          lte: new Date(endDate.setDate(endDate.getDate() + 1)), //less then next day,
        },
      },
    });
    res.status(200).json({ workShifts });
  } catch (error) {
    next(error);
  }
};

export const getWorkShiftsByEmployeeAndByInterval = async (
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
    const endDate = new Date(req.params.endDate);
    const workShifts = await prisma.workShift.findMany({
      where: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        date: {
          gte: req.params.startDate,
          lte: new Date(endDate.setDate(endDate.getDate() + 1)), //less then next day,
        },
      },
    });
    res.status(200).json({ workShifts });
  } catch (error) {
    next(error);
  }
};
