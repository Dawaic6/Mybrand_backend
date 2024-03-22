import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import allRoutes from "./router/userRoute";
import blogRoutes from "./router/blog_routes";
import cantactRoutes from "./router/contacts_routes";
import subscribeRoutes from "./router/subscribe_route";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
mongoose
    .connect(process.env.MONGO_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,  
    } as ConnectOptions)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
app.use(express.json())
app.use("/api/v1",allRoutes);
app.use("/api/v1",blogRoutes);
app.use("/api/v1",cantactRoutes);
app.use("/api/v1",subscribeRoutes);

app.listen(PORT,()=>{
    console.log("Server Started at Port " + PORT)
})