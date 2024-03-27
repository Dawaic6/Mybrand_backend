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
exports.register = exports.login = void 0;
const users_1 = require("../DB/users");
const Helpers_1 = require("../Helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = yield (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.sendStatus(400);
        }
        //@ts-ignore
        const expectedHash = (0, Helpers_1.authentication)((_b = (_a = user.authentication) === null || _a === void 0 ? void 0 : _a.salt) === null || _b === void 0 ? void 0 : _b.password);
        if (((_c = user.authentication) === null || _c === void 0 ? void 0 : _c.password) != expectedHash) {
            return res.sendStatus(403);
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, Helpers_1.random)();
        const user = yield (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, Helpers_1.authentication)(salt, password),
            }
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.register = register;
