import userModel from "../DB/user"; //import model table
import {Request,Response} from "express";
import {hashPassword} from "../utils/bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const signUp = async (req:Request,res:Response)=>{
    try{
    const userInputs = req.body
        const hashedPassword =await hashPassword(userInputs.password);
    const newUser = await userModel.create({...userInputs, password:hashedPassword})
    res.status(201).json({
        message:"User created",
        user:newUser
    })
    }catch (e) {
        console.log(e)
    }
}

const signIn = async (req:Request,res:Response)=>{
    try{
        const userInputs = req.body
        const userDB:any = await userModel.findOne({email:userInputs.email})
        if(!userDB){
            return res.status(401).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(userInputs.password, userDB.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { firstname:userDB.firstname,email:userDB.email},
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1h" }
        );
            res.status(200).json({
                message:"User loggedin",
                token:token
            })

    }catch (e) {
        console.log(e)
    }
}

export {
    signUp,
    signIn
}