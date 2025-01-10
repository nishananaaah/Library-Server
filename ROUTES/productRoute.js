import express from "express";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { borrowbyId, productbyCategory, productByid, reviewsofproduct, viewAuthors, viewproduct } from "../CONTROLLERS/productController.js";
import { memberPayment, payment, userMembership} from "../CONTROLLERS/paymentController.js";

const route = express.Router();

//Products
route.get('/products',TryCatchMiddleware(viewproduct));
route.get('/products/:id',TryCatchMiddleware(productByid));
route.get('/products/category/:categoryname',TryCatchMiddleware(productbyCategory))

//authors
route.get('/authors',TryCatchMiddleware(viewAuthors))

//Payment Memebrship
route.post('/payment/:id',TryCatchMiddleware(payment))
route.post('/memberpayment',TryCatchMiddleware(memberPayment))//verify payment

//Membership
route.post('/membership',userMembership)

//Borrows
route.post('/:userId/borrow/:productId',TryCatchMiddleware(borrowbyId))

//Reviews
route.post('/:userId/review/:productId',TryCatchMiddleware(reviewsofproduct))






export default route

