"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendToken = (status, user, res) => {
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: "1d",
    });
    res
        .status(status)
        .cookie("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
    })
        .json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    });
};
exports.sendToken = sendToken;
