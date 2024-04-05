import { User } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const sendToken = (status: number, user: User, res: Response) => {
  const token = jwt.sign(
    {
      id: user.id,
      organizationId: user.organizationId,
      isAdmin: user.isAdmin,
      accessLevel: user.accessLevel,
    },
    process.env.SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    })
    .json({
      id: user.id,
      organizationId: user.organizationId,
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
    });
};
