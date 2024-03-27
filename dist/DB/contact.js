"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUs = exports.validateContactUsModelData = exports.ContactUsSchemaValidate = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// Validation schema
exports.ContactUsSchemaValidate = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
    emailAddress: joi_1.default.string().email().required(),
    subject: joi_1.default.string().required(),
    message: joi_1.default.string().required(),
});
// Contact Us schema
const contactUsSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
// Joi validation for Mongoose model data
const validateContactUsModelData = (data) => {
    return exports.ContactUsSchemaValidate.validate(data);
};
exports.validateContactUsModelData = validateContactUsModelData;
// Creating a model
exports.ContactUs = (0, mongoose_1.model)('ContactUs', contactUsSchema);
