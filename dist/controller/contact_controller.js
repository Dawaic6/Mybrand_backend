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
const contact_1 = require("../DB/contact");
class ContactUsController {
    static createContactUs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, contact_1.validateContactUsModelData)(req.body);
                if (error) {
                    return res.status(400).send(error.details[0].message);
                }
                const newContact = new contact_1.ContactUs({
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    emailAddress: req.body.emailAddress,
                    subject: req.body.subject,
                    message: req.body.message,
                });
                const savedContact = yield newContact.save();
                return res.status(201).json({
                    data: savedContact,
                    message: "Contact request successfully created",
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
    static updateContactUs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactId = req.params.id;
                const contact = yield contact_1.ContactUs.findById(contactId);
                if (!contact) {
                    return res.status(404).json({
                        message: " No message found",
                    });
                }
                const { fullName, phoneNumber, emailAddress, subject, message } = req.body;
                const updatedContact = yield contact_1.ContactUs.findByIdAndUpdate({ _id: contactId }, {
                    fullName: fullName ? fullName : contact.fullName,
                    phoneNumber: phoneNumber ? phoneNumber : contact.phoneNumber,
                    emailAddress: emailAddress ? emailAddress : contact.emailAddress,
                    subject: subject ? subject : contact.subject,
                    message: message ? message : contact.message,
                }, { new: true });
                return res.status(200).json({
                    data: updatedContact,
                    message: "message edit request successfully updated",
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
    static getAllContactUs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield contact_1.ContactUs.find();
                return res.status(200).json({
                    data: contacts,
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
    static getOneContactUs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_1.ContactUs.findById(req.params.id);
                if (contact) {
                    return res.status(200).json({
                        data: contact,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "No message  found",
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
    static deleteContactUs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactId = req.params.id;
                const contact = yield contact_1.ContactUs.findById(contactId);
                if (!contact) {
                    return res.status(404).json({
                        message: "No message  found",
                    });
                }
                yield contact_1.ContactUs.findByIdAndDelete(contactId);
                return res.status(200).json({
                    message: 'message  successfully  deleted',
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = ContactUsController;
