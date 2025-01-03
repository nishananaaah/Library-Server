import Products from "../MODELS/productModel.js";
import Whishlist from "../MODELS/whishlistModel.js";
import User from "../MODELS/userModel.js";

export const addandremoveWhishlist = async(req,res)=>{
    const userId = req.params.userId;
    const productId = req.params.productId;

    const user = await User.findById(userId)
    if(!user){
       return res.status(404).json({message:"User not found"})
    }

    const product = await Products.findById(productId) 
    if(!product){
        return res.status(404).json({message:"Product not found"})
    }
}