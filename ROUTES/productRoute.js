import express from "express";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { productByid, viewproduct } from "../CONTROLLERS/productController.js";

const route = express.Router();

route.get('/products',TryCatchMiddleware(viewproduct));
// route.post('/addproduct',TryCatchMiddleware(addProduct));
route.get('/products/:id',TryCatchMiddleware(productByid))

export default route

