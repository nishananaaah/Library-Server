import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    startDate :{
        type : Date,
        required : true,
        default : Date.now
    },
    endStart : {
        type : Date,
        required : true,
        default : Date.now
    },
    orderTime : {
        type : String,
        required : true ,
        default : new Date().toTimeString()
    },
    orderId :{
        type : String,
        required : true 
    },
    totalPrice :{
        type : Number ,
        required : true
    },
    paymentId :{
        type :String,
        required : true
    },

});

const Borrow = mongoose.model("Borrow",borrowSchema);
export default Borrow;