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
const subscribe_1 = require("../DB/subscribe");
class SubscribeController {
    static createSubscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, subscribe_1.validateSubscribeModelData)(req.body);
                if (error) {
                    return res.status(400).send(error.details[0].message);
                }
                // Check if email already exists
                const existingSubscribe = yield subscribe_1.Subscribe.findOne({ email: req.body.email });
                if (existingSubscribe) {
                    return res.status(409).json({
                        message: "Email is already subscribed",
                    });
                }
                const newSubscribe = new subscribe_1.Subscribe({
                    email: req.body.email,
                    date: req.body.date,
                });
                const savedSubscribe = yield newSubscribe.save();
                return res.status(201).json({
                    data: savedSubscribe,
                    message: "Subscription successfully created",
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
    static updateSubscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscribeId = req.params.id;
                const subscribe = yield subscribe_1.Subscribe.findById(subscribeId);
                if (!subscribe) {
                    return res.status(404).json({
                        message: "Subscription not found",
                    });
                }
                const { email, date } = req.body;
                const updatedSubscribe = yield subscribe_1.Subscribe.findByIdAndUpdate({ _id: subscribeId }, {
                    email: email ? email : subscribe.email,
                    date: date ? date : subscribe.date,
                }, { new: true });
                return res.status(200).json({
                    data: updatedSubscribe,
                    message: "Subscription successfully updated",
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
    static getAllSubscriptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield subscribe_1.Subscribe.find();
                return res.status(200).json({
                    data: subscriptions,
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
    static getOneSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield subscribe_1.Subscribe.findById(req.params.id);
                if (subscription) {
                    return res.status(200).json({
                        data: subscription,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Subscription not found",
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
    static deleteSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptionId = req.params.id;
                const subscription = yield subscribe_1.Subscribe.findById(subscriptionId);
                if (!subscription) {
                    return res.status(404).json({
                        message: "Subscription not found",
                    });
                }
                yield subscribe_1.Subscribe.findByIdAndDelete(subscriptionId);
                return res.status(204).json({
                    message: 'Subscription deleted successfully',
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = SubscribeController;
