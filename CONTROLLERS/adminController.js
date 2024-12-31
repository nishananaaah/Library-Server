import {config} from "dotenv"
import jwt from "jsonwebtoken";
// import User from "../MODELS/userModel";

config();


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

 
