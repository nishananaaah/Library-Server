import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     author:{
      type:String,
      required:true
     },
     description :{
        type:String,
        require:true
     },
     price :{
        type :Number,
        required : true
     },
     image :{
        type :String,
        required : true
     },
     category :{
        type:String,
        required : true
     },
     availablity:{
        type : Boolean,
        default:true
     },
     isDeleted :{
        type:Boolean,
        default:false
     },
     isBorrowed :{
      type :Boolean,
      default:false
     },
     quantity :{
        type :Number,
        default:1
     },
});

const Products = mongoose.model("Product",productSchema)
export default Products;