import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";

export const addAgency = async (
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
    //check for name uniqueness
    const existingAgency = await prisma.agency.findFirst({
      where: { name: req.body.name },
    });
    if (existingAgency)
      throw createHttpError(400, "This name is already taken");
    const agency = await prisma.agency.create({
      data: { organizationId: req.user?.organizationId, ...req.body },
    });
    res.status(210).json({ agency });
  } catch (error) {
    next(error);
  }
};

export const getAgency = async (
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
    const agency = await prisma.agency.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!agency) throw createHttpError(404, "Agency not found.");
    res.status(200).json({ agency });
  } catch (error) {
    next(error);
  }
};

export const agencies = async (
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
    const agencies = await prisma.agency.findMany({
      where: { organizationId: req.user?.organizationId },
    });
    res.status(200).json({ agencies });
  } catch (error) {
    next(error);
  }
};

export const updateAgency = async (
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
    const agency = await prisma.agency.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (agency && agency.name !== req.body.name) {
      const existingName = await prisma.agency.findFirst({
        where: {
          organizationId: req.user?.organizationId,
          name: req.body.name,
        },
      });
      if (existingName)
        throw createHttpError(400, "This name is already used.");
    }
    const agencyUpdated = await prisma.agency.update({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
      data: { ...req.body },
    });
    if (!agency) throw createHttpError(404, "Agency not found.");
    res.status(201).json({ agency: agencyUpdated });
  } catch (error) {
    next(error);
  }
};

export const deleteAgency = async (
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
    const agency = await prisma.agency.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!agency) throw createHttpError(404, "Agency not found.");
    await prisma.agency.delete({
      where: { id: agency.id, organizationId: req.user?.organizationId },
    });
    res.status(200).json({ message: "Agency deleted" });
  } catch (error) {
    next(error);
  }
};
