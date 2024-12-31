import User from "../MODELS/userModel.js";
import userAuthjoi from "../VALIDATION/userjoi.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

//Register

export const register = async (req,res,next)=>{
    const {value,error} = userAuthjoi.validate(req.body)
    if(error){
      return  res.status(400).json({message:"Found validation error"})
    }
    const {username,password,email} = value
    try {
        const isExistinguser = await User.findOne({email:email})
        if(isExistinguser){
             return res.status(400).json({status:"error",message:"email already taken!"})
        }
        
        const hashedpassword = await bcryptjs.hash(password,10)//10 hash number generate security increase

        const newuser=new User({
           username:username,
           image:req.cloudinaryImageUrl,
           email:email,
          password:hashedpassword
        }) 

        await newuser.save()

        return res.status(201).json({status:"success",message:"User registered Successfully",
            data:newuser
        })
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("email", email, password);
  
    try {
      // Check if user exists
      const isUservalid = await User.findOne({ email });
      if (!isUservalid) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if user is blocked
      if (isUservalid.isDeleted) {
        return res.status(403).json({ error: "User is blocked" }); // admin blocked user
      }
  
      // Verify password
      const validPass = bcryptjs.compareSync(password, isUservalid.password);
      console.log(validPass);
      if (!validPass) {
        return res.status(400).json({ error: "Wrong credentials" });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: isUservalid.id }, process.env.USER_JWT);
      const { password: hashedPassword, ...data } = isUservalid._doc;
      const expiryDate = new Date(Date.now() + 60 * 1000);
  
      // Set cookie and send response
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ message: "User logged in successfully", user: data, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
      next(error);
    }
  };
  