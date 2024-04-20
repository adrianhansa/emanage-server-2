import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";

export const createRole = async (
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
    const { name, colour } = req.body;
    const existingRole = await prisma.role.findFirst({
      where: { name, organizationId: req.user?.organizationId },
    });
    if (existingRole) throw createHttpError(400, "This name is already taken.");
    const role =
      req.user &&
      (await prisma.role.create({
        data: { name, colour, organizationId: req.user.organizationId },
      }));
    if (!role)
      throw createHttpError(
        400,
        "Unexpected error. The role could not be created."
      );
    res.status(201).json({ role });
  } catch (error) {
    next(error);
  }
};

export const getRole = async (
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
    const role = await prisma.role.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!role) throw createHttpError(404, "Role not found.");
    res.status(200).json({ role });
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (
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
    const roles = await prisma.role.findMany({
      where: { organizationId: req.user?.organizationId },
    });
    res.status(200).json({ roles });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
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
    const { name, colour } = req.body;
    const role = await prisma.role.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!role) throw createHttpError(404, "Role not found");

    if (name !== role.name) {
      const existingRole = await prisma.role.findFirst({
        where: { name, organizationId: req.user?.organizationId },
      });
      if (existingRole)
        throw createHttpError(
          400,
          "This name is taken. Please enter a different one."
        );
    }

    const updatedRole = await prisma.role.update({
      where: { id: req.params.id },
      data: { name, colour },
    });
    res.status(201).json({ role: updatedRole });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
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
    const role = await prisma.role.findUnique({ where: { id: req.params.id } });
    if (!role) throw createHttpError(404, "Role not found");
    if (req.user && role.organizationId !== req.user.organizationId)
      throw createHttpError(401, "Unaothorized");
    await prisma.role.delete({ where: { id: req.params.id } });
    res.status(201).json({ message: "Role deleted" });
  } catch (error) {
    next(error);
  }
};
