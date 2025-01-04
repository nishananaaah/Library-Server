import mongoose from "mongoose";


const memberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   

MembershipPrice :{
    type : Number ,
    required : true
},
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
paymentId :{
    type :String,
    required : true
},

})
const Memeber = mongoose.model("Member",memberSchema);
export default Memeber