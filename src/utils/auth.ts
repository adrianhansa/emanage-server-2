import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  isAdmin: true;
  accessLevel: number;
}

interface User {
  id: string;
  isAdmin?: boolean;
  accessLevel: number | 0;
}

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) throw createHttpError(403, "Missing token");
  const userVerified = jwt.verify(
    token,
    process.env.SECRET as string
  ) as JwtPayload;
  if (!userVerified) throw createHttpError(401, "Invalid token");
  req.user = {
    id: userVerified.id,
    isAdmin: userVerified.isAdmin,
    accessLevel: userVerified.accessLevel,
  };
  next();
};

export const accessLevelRequired = (
  req: Request,
  res: Response,
  accessLevel: number,
  next: NextFunction
) => {
  if (req.user) {
    if (req.user.accessLevel >= accessLevel) {
      next();
    } else {
      res.status(401).json({
        message: "You don't have the access level to perform this operation.",
      });
    }
  } else {
    throw createHttpError(403, "Unauthorized");
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  accessLevelRequired(req, res, 5, next);
};

export const isManager = (req: Request, res: Response, next: NextFunction) => {
  accessLevelRequired(req, res, 4, next);
};

export const isDeputy = (req: Request, res: Response, next: NextFunction) => {
  accessLevelRequired(req, res, 3, next);
};

export const isSenior = (req: Request, res: Response, next: NextFunction) => {
  accessLevelRequired(req, res, 2, next);
};

export const isRcw = (req: Request, res: Response, next: NextFunction) => {
  accessLevelRequired(req, res, 1, next);
};
