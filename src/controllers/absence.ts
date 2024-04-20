import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";

export const addAbsence = async (
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
    const absence = await prisma.absence.create({
      data: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        ...req.body,
      },
    });
    res.status(201).json({ absence });
  } catch (error) {
    next(error);
  }
};

export const getAbsence = async (
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
    const absence = await prisma.absence.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!absence) throw createHttpError(404, "Absence not found");
    res.status(200).json({ absence });
  } catch (error) {
    next(error);
  }
};

export const updateAbsence = async (
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
    const absence = await prisma.absence.update({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
      data: { serviceId: service?.id, ...req.body },
    });
    if (!absence) throw createHttpError(404, "Absence not found");
    res.status(201).json({ absence });
  } catch (error) {
    next(error);
  }
};

export const deleteAbsence = async (
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
    const absence = await prisma.absence.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!absence) throw createHttpError(404, "Absence not found");
    await prisma.absence.delete({
      where: { id: absence.id, organizationId: req.user?.organizationId },
    });
    res.status(201).json({ message: "Absence deleted" });
  } catch (error) {
    next(error);
  }
};

export const getAbsencesByServiceAndInterval = async (
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
    const absences = await prisma.absence.findMany({
      where: {
        serviceId: service.id,
        organizationId: req.user?.organizationId,
        startDate: { gte: req.body.startDate },
        endDate: { lte: req.body.endDate },
      },
    });
    res.status(200).json({ absences });
  } catch (error) {
    next(error);
  }
};

export const getAbsencesByEmployeeAndInterval = async (
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
    const absences = await prisma.absence.findMany({
      where: {
        userId: req.params.userId,
        organizationId: req.user?.organizationId,
        startDate: { gte: req.body.startDate },
        endDate: { lte: req.body.endDate },
      },
    });
    res.status(200).json({ absences });
  } catch (error) {
    next(error);
  }
};
