import express from "express";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { productByid, viewproduct } from "../CONTROLLERS/productController.js";

const route = express.Router();

//Products
route.get('/products',TryCatchMiddleware(viewproduct));
route.get('/products/:id',TryCatchMiddleware(productByid));

//Payment



export default route

