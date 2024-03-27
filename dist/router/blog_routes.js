"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// BlogRoutes.ts
const express_1 = require("express");
const Multer_1 = __importDefault(require("../Helpers/Multer"));
const blog_controller_1 = __importDefault(require("../controller/blog_controller"));
const blogRoutes = (0, express_1.Router)();
blogRoutes.post('/post-blog', Multer_1.default.single('blogImage'), blog_controller_1.default.createBlog);
blogRoutes.put('/update-blog/:id', Multer_1.default.single('blogImage'), blog_controller_1.default.updateBlog);
blogRoutes.get('/getall-blog', blog_controller_1.default.getAllBlogs);
blogRoutes.get('/getone-blog/:id', blog_controller_1.default.getOneBlog);
blogRoutes.delete('/delete-blog/:id', blog_controller_1.default.deleteBlog);
exports.default = blogRoutes;
