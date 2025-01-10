import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
})
const Authors = mongoose.model("authors",authorSchema);
export default Authors;