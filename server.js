import express from "express";
import mongoose from "mongoose";
import adminRoute from "./ROUTES/adminRoute.js"

const app = express();
const port = 3000;

app.use(express.json())
app.use("/api/admin",adminRoute)

mongoose.connect('mongodb://localhost:27017/library')
.then(()=>console.log("DB Conneted"))
.catch((err)=>console.log(err))

app.listen(port,()=>{
    console.log("Server running")
})