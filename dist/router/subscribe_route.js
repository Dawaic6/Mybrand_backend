"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// SubscribeRoutes.ts
const express_1 = require("express");
const subscribe_controller_1 = __importDefault(require("../controller/subscribe_controller"));
const subscribeRoutes = (0, express_1.Router)();
subscribeRoutes.post('/post-subscribe', subscribe_controller_1.default.createSubscribe);
subscribeRoutes.put('/update-subscribe/:id', subscribe_controller_1.default.updateSubscribe);
subscribeRoutes.get('/getall-subscribe', subscribe_controller_1.default.getAllSubscriptions);
subscribeRoutes.get('/getone-subscribe/:id', subscribe_controller_1.default.getOneSubscription);
subscribeRoutes.delete('/delete-subscribe/:id', subscribe_controller_1.default.deleteSubscription);
exports.default = subscribeRoutes;
