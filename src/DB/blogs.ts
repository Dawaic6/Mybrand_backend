import { Schema, model, Document } from 'mongoose';
import Joi from 'joi';

const blogSchemaValidate = Joi.object({
    blogTitle: Joi.string().required(),
    blogDescription: Joi.string().required(),
    blogDate: Joi.string().required(),
    blogImage: Joi.string(),
    likedBy: Joi.array().items(Joi.string()),
});

interface IBlog extends Document {
    blogTitle: string;
    blogDescription: string;
    blogDate: string;
    blogImage: string;
   }

// Blog schema
const blogSchema = new Schema<IBlog>({
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
export const validateBlogModelData = (data: IBlog) => {
    return blogSchemaValidate.validate(data);
};

// Creating a model
export const Blog = model<IBlog>('Blog', blogSchema);