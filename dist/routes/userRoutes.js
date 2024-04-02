"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const express_validator_1 = require("express-validator");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/register", [
    (0, express_validator_1.check)("firstName", "First name is required.").isString(),
    (0, express_validator_1.check)("lastName", "Last name is required.").isString(),
    (0, express_validator_1.check)("email", "Email is required.").isEmail(),
    (0, express_validator_1.check)("password", "Password must have at least 6 characters.").isLength({
        min: 6,
    }),
], userController_1.register);
userRoutes.post("/login", [
    (0, express_validator_1.check)("email", "Email is required.").isEmail(),
    (0, express_validator_1.check)("password", "Password must have at least 6 characters.").isLength({
        min: 6,
    }),
], userController_1.login);
exports.default = userRoutes;
