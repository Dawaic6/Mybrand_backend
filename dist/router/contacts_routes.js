"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ContactUsRoutes.ts
const express_1 = require("express");
const contact_controller_1 = __importDefault(require("../controller/contact_controller"));
const contactUsRoutes = (0, express_1.Router)();
contactUsRoutes.post('/post-contact-message', contact_controller_1.default.createContactUs);
contactUsRoutes.put('/update-contact-message/:id', contact_controller_1.default.updateContactUs);
contactUsRoutes.get('/getall-contact-message', contact_controller_1.default.getAllContactUs);
contactUsRoutes.get('/getone-contact-message/:id', contact_controller_1.default.getOneContactUs);
contactUsRoutes.delete('/delete-contact-message/:id', contact_controller_1.default.deleteContactUs);
exports.default = contactUsRoutes;
