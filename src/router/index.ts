import {Router,Response}  from "express";
import userRoutes from "./userRoute";

const router = Router();
router.use("/user",userRoutes);
router.get("/welcome",(res:Response):any=>{
    res.status(200).json({message:"Welcome cedro"})
});

export default router;