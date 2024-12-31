import express from "express";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { addProduct, viewproduct } from "../CONTROLLERS/productController.js";

const route = express.Router();

route.get('/products',TryCatchMiddleware(viewproduct));
route.post('/addproduct',TryCatchMiddleware(addProduct));

export default route

