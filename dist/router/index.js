"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
const router = (0, express_1.Router)();
router.use("/user", userRoute_1.default);
router.get("/welcome", (res) => {
    res.status(200).json({ message: "Welcome cedro" });
});
exports.default = router;
