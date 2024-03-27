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
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../DB/user")); //import model table
const bcrypt_1 = require("../utils/bcrypt");
const bcrypt_2 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInputs = req.body;
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(userInputs.password);
        const newUser = yield user_1.default.create(Object.assign(Object.assign({}, userInputs), { password: hashedPassword }));
        res.status(201).json({
            message: "User created",
            user: newUser
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInputs = req.body;
        const userDB = yield user_1.default.findOne({ email: userInputs.email });
        if (!userDB) {
            return res.status(401).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt_2.default.compare(userInputs.password, userDB.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ firstname: userDB.firstname, email: userDB.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({
            message: "User loggedin",
            token: token
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.signIn = signIn;
