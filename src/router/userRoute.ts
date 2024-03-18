import {signUp,signIn} from "../controller/userController";
import {Router} from "express";


const router = Router()
router.post("/signup",signUp);
router.post("/signin",signIn);

export default  router;
