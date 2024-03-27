"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribe = exports.validateSubscribeModelData = exports.SubscribeSchemaValidate = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// Validation schema
exports.SubscribeSchemaValidate = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    date: joi_1.default.date().default(Date.now),
});
// Subscribe schema
const subscribeSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
// Joi validation for Mongoose model data
const validateSubscribeModelData = (data) => {
    return exports.SubscribeSchemaValidate.validate(data);
};
exports.validateSubscribeModelData = validateSubscribeModelData;
// Creating a model
exports.Subscribe = (0, mongoose_1.model)('Subscribe', subscribeSchema);
