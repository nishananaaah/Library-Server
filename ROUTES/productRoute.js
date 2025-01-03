import express from "express";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { productByid, viewproduct } from "../CONTROLLERS/productController.js";
import { payment, userMembership, verifyPayment } from "../CONTROLLERS/paymentController.js";

const route = express.Router();

//Products
route.get('/products',TryCatchMiddleware(viewproduct));
route.get('/products/:id',TryCatchMiddleware(productByid));


//Payment
route.post('/payment/:id',TryCatchMiddleware(payment))
route.post('/verifypayment',TryCatchMiddleware(verifyPayment))

//Membership
route.post('/membership',userMembership)



export default route

