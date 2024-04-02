import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/sendToken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName } = req.body;
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        lastName,
        firstName,
        password: hashedPassword,
        isAdmin: true,
        accessLevel: 5,
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
  try {
    if (!email || !password) throw createHttpError(400, "Parameters missing");

    const user = await prisma.user.findUnique({
      where: { email },
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
  } catch (error) {
    next(error);
  }
};
