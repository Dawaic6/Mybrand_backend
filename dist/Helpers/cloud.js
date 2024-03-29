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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadToCloud = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARYNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
});
const UploadToCloud = (file, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profilePicture = yield cloudinary_1.v2.uploader.upload(file.path, {
            folder: "image",
            use_filename: true,
        });
        return profilePicture;
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Error uploading to Cloudinary",
        });
    }
});
exports.UploadToCloud = UploadToCloud;
