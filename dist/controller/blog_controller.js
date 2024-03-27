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
Object.defineProperty(exports, "__esModule", { value: true });
const cloud_1 = require("../Helpers/cloud");
const blogs_1 = require("../DB/blogs");
class BlogController {
    static createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, blogs_1.validateBlogModelData)(req.body);
                if (error) {
                    return res.status(400).send(error.details[0].message);
                }
                if (!req.file) {
                    return res.status(400).json({
                        message: "blog image is missing",
                    });
                }
                const result = yield (0, cloud_1.UploadToCloud)(req.file, res);
                const newBlog = new blogs_1.Blog({
                    blogTitle: req.body.blogTitle,
                    blogDescription: req.body.blogDescription,
                    blogDate: req.body.blogDate,
                    blogImage: result.secure_url
                });
                const savedBlog = yield newBlog.save();
                return res.status(201).json({
                    data: savedBlog,
                    message: "Blog successfully created",
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        });
    }
    static updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.id;
                const blog = yield blogs_1.Blog.findById(blogId);
                if (!blog) {
                    return res.status(404).json({
                        message: "Blog not found",
                    });
                }
                let result;
                if (req.file) {
                    result = yield (0, cloud_1.UploadToCloud)(req.file, res);
                }
                const { blogTitle, blogDescription, blogDate } = req.body;
                const updatedBlog = yield blogs_1.Blog.findByIdAndUpdate({ _id: blogId }, {
                    blogTitle: blogTitle ? blogTitle : blog.blogTitle,
                    blogDescription: blogDescription ? blogDescription : blog.blogDescription,
                    blogDate: blogDate ? blogDate : blog.blogDate,
                    blogImage: result ? result.secure_url : blog.blogImage,
                }, { new: true });
                return res.status(200).json({
                    data: updatedBlog,
                    message: "Blog successfully updated",
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        });
    }
    static getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield blogs_1.Blog.find();
                return res.status(200).json({
                    data: blogs,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        });
    }
    static getOneBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blogs_1.Blog.findById(req.params.id);
                if (blog) {
                    return res.status(200).json({
                        data: blog,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Blog not found",
                    });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        });
    }
    static deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.id;
                const blog = yield blogs_1.Blog.findById(blogId);
                if (!blog) {
                    return res.status(404).json({
                        message: "Blog not found",
                    });
                }
                yield blogs_1.Blog.findByIdAndDelete(blogId);
                return res.status(200).json({
                    message: "Blogs are deleted successfully",
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = BlogController;
