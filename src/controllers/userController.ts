import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/sendToken";
import slugify from "slugify";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, organizationName } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createHttpError(400, {
        message: errors.array().map((error) => error.msg),
      });
    //TO DO: email verification
    //TO DO: account activation
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw createHttpError(400, "This user already exists");

    const existingOrganizationName = await prisma.organization.findUnique({
      where: { name: organizationName },
    });
    if (existingOrganizationName)
      throw createHttpError(
        400,
        "This name is already taken. Please enter a different one."
      );

    const slug = slugify(organizationName, {
      lower: true,
      remove: /[*+~.()'"!?:@]/g,
    });

    const organization = await prisma.organization.create({
      data: { name: organizationName, slug },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        lastName,
        firstName,
        password: hashedPassword,
        isAdmin: true,
        accessLevel: 5,
        organizationId: organization.id,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw createHttpError(400, {
      message: errors.array().map((error) => error.msg),
    });
  try {
    if (!email || !password) throw createHttpError(400, "Parameters missing");

    const user = await prisma.user.findUnique({
      where: { email, isActive: true },
    });
    if (!user) throw createHttpError(404, "User not found");
    const passwordVerified = await bcrypt.compare(password, user.password);
    if (!passwordVerified) throw createHttpError(400, "Invalid credentials");

    sendToken(200, user, res);
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token").send();
};

export const updateProfileBasic = async (
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
    //Id comes from req.user
    const { email, phone, address, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: req.user?.id },
      data: { email, phone, address, password: hashedPassword },
    });
    if (!user) throw createHttpError(404, "User not found.");
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateProfileSecurity = async (
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
    //Id comes from req.params
    const { id } = req.params;

    const {
      email,
      phone,
      address,
      firstName,
      lastName,
      payrollNumber,
      isDriver,
      isActive,
      isInProbation,
      contractHours,
      roleId,
      serviceId,
    } = req.body;
    const user = await prisma.user.update({
      where: { id, organizationId: req.user?.organizationId },
      data: {
        email,
        phone,
        address,
        firstName,
        lastName,
        payrollNumber,
        isDriver,
        isActive,
        isInProbation,
        contractHours,
        roleId,
        serviceId,
      },
    });
    if (!user) throw createHttpError(404, "User not found.");
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateProfileAdminSecurity = async (
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
    //Id comes from req.params
    const { id } = req.params;

    const {
      email,
      phone,
      address,
      firstName,
      lastName,
      payrollNumber,
      isDriver,
      isActive,
      isAdmin,
      isInProbation,
      contractHours,
      accessLevel,
      roleId,
      serviceId,
    } = req.body;
    const user = await prisma.user.update({
      where: { id, organizationId: req.user?.organizationId },
      data: {
        email,
        phone,
        address,
        firstName,
        lastName,
        payrollNumber,
        isDriver,
        isActive,
        isInProbation,
        contractHours,
        roleId,
        serviceId,
        isAdmin,
        accessLevel,
      },
    });
    if (!user) throw createHttpError(404, "User not found.");
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const addUser = async (
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
    //to do: create Organization / Role / Service endpoints
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
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
    const user = await prisma.user.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });

    if (!user) throw createHttpError(404, "User not found");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (
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
    if (req.params.organizationId !== req.user?.organizationId)
      throw createHttpError(401, "Unauthorized");
    const users = await prisma.user.findMany({
      where: { organizationId: req.params.organizationId },
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const usersByService = async (
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
    if (req.params.organizationId !== req.user?.organizationId)
      throw createHttpError(401, "Unauthorized");
    const users = await prisma.user.findMany({
      where: {
        organizationId: req.params.organizationId,
        serviceId: req.params.serviceId,
      },
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id, organizationId: req.user?.organizationId },
    });
    if (!user) throw createHttpError(404, "User not found.");
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "User deleted." });
  } catch (error) {
    next(error);
  }
};
