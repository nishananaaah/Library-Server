import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username :{
        type : String,
        // required : true
      },
      email:{
        type : String ,
        required : true 
      },
      googleId: { type: String },
      password :{
        type : String,
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
      image:{
        type:String,
        required:false
      },
    borrow:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Borrow",
  }]
   
},{timestamps:true})//Adds createdAt and updatedAt fields automatically)

const User = mongoose.model("User",userSchema)
export default User;