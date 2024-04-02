"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendToken_1 = require("../utils/sendToken");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            throw (0, http_errors_1.default)(400, {
                message: errors.array().map((error) => error.msg),
            });
        // if (!email || !password || !firstName || !lastName)
        //   throw createHttpError(400, "Parameters missing");
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser)
            throw (0, http_errors_1.default)(400, "This user already exists");
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.default.user.create({
            data: { email, lastName, firstName, password: hashedPassword },
        });
        res.status(201).json({ user });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            throw (0, http_errors_1.default)(400, "Parameters missing");
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user)
            throw (0, http_errors_1.default)(404, "User not found");
        const passwordVerified = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordVerified)
            throw (0, http_errors_1.default)(400, "Invalid credentials");
        (0, sendToken_1.sendToken)(200, user, res);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
