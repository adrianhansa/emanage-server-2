import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";

export const getShifts = async (
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
    if (!service) throw createHttpError(404, "service not found");
    const shifts = await prisma.shift.findMany({
      where: { serviceId: service.id },
    });
    res.status(200).json({ shifts });
  } catch (error) {
    next(error);
  }
};

export const getShift = async (
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
    const shift = await prisma.shift.findUnique({
      where: { id: req.params.id },
    });
    if (!shift) throw createHttpError(404, "Shift not found.");
    res.status(200).json({ shift });
  } catch (error) {
    next(error);
  }
};

export const updateShift = async (
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

    const shift = await prisma.shift.update({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
      data: { ...req.body },
    });
    if (!shift) throw createHttpError(404, "Shift not found");
    res.status(201).json({ shift });
  } catch (error) {
    next(error);
  }
};

export const createShift = async (
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
    if (!service) throw createHttpError(404, "service not found");
    const shift = await prisma.shift.create({
      data: {
        organizationId: req.user?.organizationId,
        serviceId: service.id,
        ...req.body,
      },
    });
    if (!shift)
      throw createHttpError(
        400,
        "Something went wrong. The shift could not be created."
      );
    res.status(201).json({ shift });
  } catch (error) {
    next(error);
  }
};

export const deleteShift = async (
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
    const shift = await prisma.shift.findUnique({
      where: { id: req.params.id, organizationId: req.body?.organizationId },
    });
    if (!shift) throw createHttpError(404, "Shift not found.");
    await prisma.shift.delete({
      where: { id: req.params.id, organizationId: req.body?.organizationId },
    });
  } catch (error) {
    next(error);
  }
};
