import express from "express";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { borrowbyId, productByid, reviewsofproduct, viewproduct } from "../CONTROLLERS/productController.js";
import { memberPayment, payment, userMembership} from "../CONTROLLERS/paymentController.js";

const route = express.Router();

//Products
route.get('/products',TryCatchMiddleware(viewproduct));
route.get('/products/:id',TryCatchMiddleware(productByid));


//Payment Memebrship
route.post('/payment/:id',TryCatchMiddleware(payment))
route.post('/memberpayment',TryCatchMiddleware(memberPayment))

//Membership
route.post('/membership',userMembership)

//Borrows
route.post('/:userId/borrow/:productId',TryCatchMiddleware(borrowbyId))

//Reviews
route.post('/:productId/review',TryCatchMiddleware(reviewsofproduct))



export default route

