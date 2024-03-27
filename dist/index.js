"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./router/userRoute"));
const blog_routes_1 = __importDefault(require("./router/blog_routes"));
const contacts_routes_1 = __importDefault(require("./router/contacts_routes"));
const subscribe_route_1 = __importDefault(require("./router/subscribe_route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
mongoose_1.default
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
app.use(express_1.default.json());
app.use("/api/v1", userRoute_1.default);
app.use("/api/v1", blog_routes_1.default);
app.use("/api/v1", contacts_routes_1.default);
app.use("/api/v1", subscribe_route_1.default);
app.listen(PORT, () => {
    console.log("Server Started at Port " + PORT);
});
