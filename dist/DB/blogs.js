"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.validateBlogModelData = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const blogSchemaValidate = joi_1.default.object({
    blogTitle: joi_1.default.string().required(),
    blogDescription: joi_1.default.string().required(),
    blogDate: joi_1.default.string().required(),
    blogImage: joi_1.default.string(),
});
// Blog schema
const blogSchema = new mongoose_1.Schema({
    blogTitle: {
        type: String,
        required: true,
    },
    blogDescription: {
        type: String,
        required: true,
    },
    blogDate: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
});
// Joi validation for Mongoose model data
const validateBlogModelData = (data) => {
    return blogSchemaValidate.validate(data);
};
exports.validateBlogModelData = validateBlogModelData;
// Creating a model
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
