import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/library')
.then(()=>console.log("DB Conneted"))
.catch((err)=>console.log(err))

app.listen(port,()=>{
    console.log("Server running")
})