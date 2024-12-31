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
// export const adminviewUserbyId = async(req,res,next)=>{
//     const {id} = req.params

//     const user = await User.findById(id).populate({
//         path: "borrow",
//         populate: { path: "productId" },
//     });
    
//     console.log(user)

//     if(!user){
//          return res.status(404).json({message:"User not found"})
//     }
//     res.status(200).json(user)

// }

 
