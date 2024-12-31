import jwt, { decode } from "jsonwebtoken";
import { config } from "dotenv";

config();
export const usertocken = (req,res,next) =>{
    try {
        const authHeader = req.headers["authorization"];

        if(!authHeader){
            return res.status(403).json({message:"Tocken not provided"})
        }
        const token = authHeader.split(" ")[1];
   if(!token){
    res.status(403).json({message:"Tocken not invalid"})
   }
  jwt.verify(token,process.env.USER_JWT,(err,decode)=>{
    if(err){
        res.status(401).json({message:"Unauthorized"})
    }
    req.email = decode.email;
    next();
  })

    } catch (error) {
        res.status(500).json({message:"Server error"})
        next(error)
    }
}