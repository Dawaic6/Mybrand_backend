"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controller/userController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/signup", userController_1.signUp);
router.post("/signin", userController_1.signIn);
exports.default = router;
