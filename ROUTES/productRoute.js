import express from "express";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { borrowbyId, getUserBorrows, productbyCategory, productByid, productSearch, returnById,unborrowById, userByid,viewAllusers, viewAuthors, viewproduct } from "../CONTROLLERS/productController.js";
import { memberPayment, payment, userMembership} from "../CONTROLLERS/paymentController.js";
import { getMmebership } from "../CONTROLLERS/membershipController.js";
import { addReview, getReview } from "../CONTROLLERS/reviewController.js";

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
route.post('/:userId/borrow/:productId',TryCatchMiddleware(borrowbyId))//borrow
route.post('/:userId/unborrow/:productId',TryCatchMiddleware(unborrowById))
route.post('/:userId/return/:productId',TryCatchMiddleware(returnById))//return
route.get('/borrow/:borrowId',TryCatchMiddleware(getUserBorrows))

//Reviews
route.post('/:userId/review/:productId',TryCatchMiddleware(addReview))
route.get('/reviews',TryCatchMiddleware(getReview))

route.get('/search',TryCatchMiddleware(productSearch))

//Users
route.get('/viewAllusers',TryCatchMiddleware(viewAllusers))
route.get('/user/:userId',TryCatchMiddleware(userByid))


//getmembership
route.get('/getmembership',TryCatchMiddleware(getMmebership))


export default route

