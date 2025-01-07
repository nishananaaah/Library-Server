import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({

 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
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
    BorrowTime : {
        type : String,
        required : true ,
        default : new Date().toTimeString()
    },
    // MembershipPrice :{
    //     type : Number ,
    //     required : true
    // }
  

});

const Borrow = mongoose.model("Borrow",borrowSchema);
export default Borrow;