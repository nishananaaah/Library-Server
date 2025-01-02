import express from "express";
import mongoose from "mongoose";
import adminRoute from "./ROUTES/adminRoute.js";
import authRoute from "./ROUTES/authenticationRoute.js"
import productRoute from "./ROUTES/productRoute.js";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config()



const app = express();
const port = 3000;
app.use(cors());
app.use(express.json())
app.use("/api/users",authRoute)
app.use("/api/admin",adminRoute)
app.use("/api/users",productRoute)

mongoose.connect('mongodb://localhost:27017/library')
.then(()=>console.log("DB Conneted"))
.catch((err)=>console.log(err))

app.listen(port,()=>{
    console.log("Server running")
})