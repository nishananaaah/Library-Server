import mongoose from "mongoose";


const memberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

totalPrice :{
    type : Number ,
    required : true
},
paymentId :{
    type :String,
    required : true
},

})
const Memeber = mongoose.model("Member",memberSchema);
export default Memeber