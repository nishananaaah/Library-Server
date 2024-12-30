import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username :{
        type : String,
        required : true
      },
      email:{
        type : String ,
        required : true 
      },
      password :{
        type : String,
        required : true
      },
      create_at :{
        type: Date,
        default:Date.now,
        required : true
      },
      isDeleted:{
        type:Boolean,
         default:false
      },
      cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    }],
    borrow:[{  //orders
        type:mongoose.Schema.Types.ObjectId,
        ref:"Borrow"
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wishlist",
    }],
},{timestamps:true})//Adds createdAt and updatedAt fields automatically)

const User = mongoose.model("User",userSchema)
export default User;