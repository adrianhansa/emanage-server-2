import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";

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
      where: { slug: req.params.slug },
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
  } catch (error) {
    next(error);
  }
};
