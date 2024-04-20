import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import slugify from "slugify";

export const getOrganization = async (
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
    const organization = await prisma.organization.findUnique({
      where: { slug: req.params.slug, id: req.user?.organizationId },
    });
    if (!organization) throw createHttpError(404, "Organization not found");
    res.status(200).json({ organization });
  } catch (error) {
    next(error);
  }
};

export const updateOrganization = async (
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
    if (req.params.id !== req.user?.organizationId)
      throw createHttpError(401, "Unauthorized");
    const { name, address, city, phone, postalCode } = req.body;
    const organization = await prisma.organization.findUnique({
      where: { id: req.params.id },
    });
    if (!organization) throw createHttpError(404, "Organization not found");
    if (name !== organization.name) {
      //check if the new nam is unique
      const existingName = await prisma.organization.findFirst({
        where: { name },
      });
      if (existingName)
        throw createHttpError(
          400,
          "This name is already taken. Please enter a different one."
        );
    }
    const slug = slugify(name, { lower: true, remove: /[*+~.()'"!?:@]/g });
    const updatedOrganization = await prisma.organization.update({
      where: { id: req.params.id },
      data: { name, address, phone, postalCode, city, slug },
    });
    res.status(201).json({ organization: updatedOrganization });
  } catch (error) {
    next(error);
  }
};
