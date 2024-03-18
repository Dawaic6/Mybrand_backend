import { Schema, model, Document } from 'mongoose';
import Joi from 'joi';

// Validation of  blog schame
const blogSchemaValidate = Joi.object({
    blogTitle: Joi.string().required(),
    blogDescription: Joi.string().required(),
    blogDate: Joi.date().required(),
    blogImage: Joi.string(),
    likedBy: Joi.array().items(Joi.string()),
});

interface IBlog extends Document {
    blogTitle: string;
    blogDescription: string;
    blogDate: Date;
    blogImage: string;
    comments: Comment[];
    likes: number;
    likedBy: string[]; // Add likedBy field to interface
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
        type: Date,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    comments: [
        {
            blogSubject: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                default: new Date().toISOString(),
            },
        },
    ],
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Add likedBy field to Mongoose schema
});
// Joi validation for Mongoose model data
export const validateBlogModelData = (data: IBlog) => {
    return blogSchemaValidate.validate(data);
};

// Creating a model
export const Blog = model<IBlog>('Blog', blogSchema);