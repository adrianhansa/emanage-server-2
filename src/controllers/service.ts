import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import slugify from "slugify";

export const getService = async (
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
        slug: req.params.slug,
        organizationId: req.user?.organizationId,
      },
      include: { organization: true },
    });
    if (!service) throw createHttpError(404, "Service not found");
    res.status(200).json({ service });
  } catch (error) {
    next(error);
  }
};

export const createService = async (
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
    const { name, address, phone, city, postalCode } = req.body;
    const slug = slugify(name, { lower: true, remove: /[*+~.()'"!?:@]/g });
    const existingName = await prisma.service.findFirst({ where: { name } });
    if (existingName)
      throw createHttpError(
        400,
        "This name is already taken. Please enter a different one."
      );
    const service =
      req.user &&
      (await prisma.service.create({
        data: {
          name,
          slug,
          address,
          city,
          postalCode,
          phone,
          organizationId: req.user.organizationId,
        },
      }));
    if (!service)
      throw createHttpError(
        400,
        "There was an error while creating the service"
      );
    res.status(200).json({ service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (
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
    const { name, address, phone, city, postalCode } = req.body;
    const service = await prisma.service.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!service) throw createHttpError(404, "Service not found.");
    if (service.name !== name) {
      //check if the new name is unique to the cmpany
      const existingName = await prisma.service.findFirst({
        where: { name, organizationId: req.user?.organizationId },
      });
      if (existingName)
        throw createHttpError(
          400,
          "This name is already taken. Please enter a different one."
        );
    }
    const slug = slugify(name, { lower: true, remove: /[*+~.()'"!?:@]/g });
    const updatedService = await prisma.service.update({
      where: { id: req.params.id },
      data: { name, slug, address, city, phone, postalCode },
    });
    res.status(201).json({ service: updatedService });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (
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
    const services = await prisma.service.findMany({
      where: { organizationId: req.user?.organizationId },
    });
    res.status(200).json({ services });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (
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
    const service = await prisma.service.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!service) throw createHttpError(404, "Service not found");
    await prisma.service.delete({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    next(error);
  }
};
