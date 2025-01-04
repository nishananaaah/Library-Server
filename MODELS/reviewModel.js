import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    postedDate : {
        type:String,
        required : true,
        default : Date.now
    },
    content : {
        type : String,
        required : true
    }
});
const Review = mongoose.model("Review",reviewSchema);
export default Review;