import Cart from "../MODELS/cartModel";
import Products from "../MODELS/productModel";
import User from "../MODELS/userModel";
import products from "razorpay/dist/types/products";

export const addtoCart = async (req,res)=>{
    const userId = req.params.userId;
    const productId = req.params.productId;

    //Find user
    const user = await User.findById(userId);
    if(!user){
       return res.status(404).json({message:"User not found"})
    }
    if(user.isDeleted==true){
      return  res.status(210).json({message:"Admin blocked this user"})
    }
    
    //Find product
    const product = await Products.findById(productId);
    if(!product){
        return res.status(404).json({message:"Product not found"})
    }

    //Check product already add or not 
    const itemCart = await Cart.findOne({userId:user._id,productId:product._id})
    if(itemCart){
        itemCart.quantity++
        await itemCart.save()
        return res.status(200).json({message:"Cart product increment quantity"})
    }else{
        itemCart = await Cart.create({
            userId:user._id,
            productId:product._id,
        })
    }

    //item add in cart
    user.cart.push(itemCart._id)
    await user.save();
    return res.status(200).json({message:"Product added successfully"})
}

//View the cart
 export const viewcart = async (req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    
    if(!user.cart||user.cart.length===0){
        return res.status(200).json({message:'yout cart is empty',data:[]})
      }
      res.status(200).json(user.cart)
  
    
 }
 //increment cart quantity
 export const incrementquantity = async(req,res)=>{
    const userId = req.params.id;
    const productId = req.params.id

    //find user
    const user = User.findById(userId);
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    //product find 
    const product = Products.findById(productId);
    if(!product){
        return res.status(404).json({message:"Product not found"})
    }
 }