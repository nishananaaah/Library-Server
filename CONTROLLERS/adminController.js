import {config} from "dotenv"
import jwt from "jsonwebtoken";
import User from "../MODELS/userModel.js";


config();

//admin login 
export default async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email)
   
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const tocken = jwt.sign({ email }, process.env.ADMIN_SECRET_KEY);
        res.cookie('access_token', tocken, { httpOnly: true }); // save in cookies
        return res.status(200).json({ message: "Admin logged successfully", tocken }); // provide token
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

//view allUsers
export const viewAllusers = async (req,res,next)=>{
    const users = await User.find()

    if(users.length==0){
        res.status(404).json({message:"No users in database"})
    }
    res.status(200).json(users)
}

//viewuserbyid
export const adminviewUserbyid=async(req,res,next)=>{
    const {userId}=req.params;

    // const user=await User.findById(id).populate({
    //     path:'orders',
    //     populate:{path:'productId'}
    // })
    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({message:'user not found'})
    }

    res.status(200).json(user)
}

//Viewbyusername
export const adminviewbyUsername = async (req,res,next)=>{
    const {username} = req.params
    const user=await User.find({username:{$regex:new RegExp(username,'i')}}).select('username');
    if(!user){
        res.status(404).json({message:"Cannot find username"})
    }
    res.status(200).json(user)
}

//Blockuser
export const adminBlockuser = async(req,res,next)=>{
    const {userId} = req.params;
    const userblocked =  User.findByIdAndUpdate({_id:userId},{$set:{isDeleted:true}});

    if(!userblocked){
        res.status(404).json({message:"User not found"})
    }
      res.status(200).json({message:"User blocked successfully"})
}

//Unblockuser
export const adminUnblockuser = async(req,res,next)=>{
    const {userId} = req.params;
    const userunblocked = User.findByIdAndUpdate({_id:userId},{$set:{isDeleted:false}})

    if(!userunblocked){
        res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"User unblocked successfully"})
}
 
