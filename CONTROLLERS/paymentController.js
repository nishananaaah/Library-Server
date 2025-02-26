import Razorpay from "razorpay";
import dotenv from "dotenv";
import User from "../MODELS/userModel.js";
import Memeber from "../MODELS/membersModel.js";
// import Products from "../MODELS/productModel.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcrypt"
import crypto from "crypto"



dotenv.config();

//Membership
 export const userMembership = async(req,res,next)=>{
    const {email,password} = req.body
    try{
    const userlogin = await User.findOne({email})
    if(!userlogin){
        return res.status(404).json({message:"User not found"})
    }
    if(userlogin.isDeleted){
        return res.status(403).json({message:"Admin blocked this user"})
    }

     // Verify password
     const validPass = bcryptjs.compareSync(password, userlogin.password);
     console.log(validPass);
     if (!validPass) {
       return res.status(400).json({ error: "Wrong credentials" });
     }
        // Generate JWT
        const token = jwt.sign({ id: userlogin.id }, process.env.USER_JWT);
        const { password: hashedPassword, ...data } = userlogin._doc;
        const expiryDate = new Date(Date.now() + 60 * 1000);

        
      // Set cookie and send response
      res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ message: "Membership has successfully activated", user: data, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};
  const razorpay = new Razorpay({
  key_id: process.env.Razorpay_key_id,
  key_secret: process.env.Razorpay_key_secret,
});

export const payment = async (req, res) => {
    try {
      const { id } = req.params; // User ID from the request
      const { amount } = req.body; // Amount from the client-side
  
      // Validate user
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Validate amount
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount provided" });
      }
  
      // Razorpay order options
      const options = {
        amount: amount * 100, // Convert to the smallest currency unit (e.g., paisa)
        currency: "INR",
        receipt: `receipt_order_${Math.random().toString(36).substring(2, 15)}`,
        notes: {
          userId: id, // Pass user ID here
          description: "Direct payment without cart", // Add a description
        },
      };
  
      // Create Razorpay order
      const order = await razorpay.orders.create(options);
  
      res.status(200).json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      console.error("Payment Error:", error);
      res.status(500).json({ message: "Payment failed", error: error.message });
    }
  };













  
//verify payment
export const memberPayment = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
      // Verify Razorpay signature
      const hmac = crypto.createHmac("sha256", process.env.Razorpay_key_secret);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generatedSignature = hmac.digest("hex");
  
      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Signature mismatch, verification failed" });
      }
  
      // Fetch the order from Razorpay
      const order = await razorpay.orders.fetch(razorpay_order_id);
      if (!order) {
        return res.status(404).json({ message: "Order not found in Razorpay" });
      }
  
      // Validate the order notes
      if (!order.notes || !order.notes.userId) {
        return res.status(400).json({ message: "Invalid or missing user ID in order notes" });
      }
  
      const user = await User.findById(order.notes.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found for this order" });
      }
  
      // Save payment details
      const newOrder = new Memeber({
        userId: user.id,
        amount: order.amount,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        totalPrice: order.amount / 100,
        status: "active",
      });
  
      await newOrder.save();
    //   user.orders.push(newOrder);
      await user.save();
  
      res.status(200).json({ message: "Membership has successfully activated" });
    } catch (error) {
      console.error("Verify Payment Error:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  