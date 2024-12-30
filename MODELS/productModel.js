import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
     name :{
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
        default:false
     },
     isDeleted :{
        type:Boolean,
        default:false
     },
     quantity :{
        type :Number,
        default:1
     },
});

const Products = mongoose.model("Products",productSchema)
export default Products;