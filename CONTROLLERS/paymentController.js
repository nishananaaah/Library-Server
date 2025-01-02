import Razorpay from "razorpay";
import dotenv from "dotenv";
import User from "../MODELS/userModel.js";
import Borrow from "../MODELS/borrowModel.js"
import crypto from "crypto";


dotenv.config();
const razorpay = new Razorpay({
    key_id:process.env.Razorpay_key_id,
    key_secret:process.env.Razorpay_key_secret,
});

export const payment = async()=>{
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    res.status(200).json()
}