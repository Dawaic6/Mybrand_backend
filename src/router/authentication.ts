import  express  from "express";

import { register } from "../controller/authentication";
 
const router = express.Router();

export default():express.Router =>
return router;