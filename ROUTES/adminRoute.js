import express from "express";
import  login, { adminBlockuser, adminUnblockuser, adminviewallMmebers, adminviewbyUsername, adminviewUserbyid, viewAllusers }  from "../CONTROLLERS/adminController.js";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { addProduct, admincangetReview, admindeleteProductbyid, admineditProduct, adminproductbycategery, adminviewProductbyid } from "../CONTROLLERS/adminproductController.js";
import { admingetborrows, viewproduct } from "../CONTROLLERS/productController.js";
import route from "./productRoute.js";
import { addMembership } from "../CONTROLLERS/membershipController.js";

const router = express.Router();

//Admin Login
router.post('/login',TryCatchMiddleware(login))

//Users
router.get('/viewAllusers',TryCatchMiddleware(viewAllusers))
router.get('/user/:userId',TryCatchMiddleware(adminviewUserbyid))
router.get('/user/findname/:username',TryCatchMiddleware(adminviewbyUsername))
router.put('/user/block/:userId',TryCatchMiddleware(adminBlockuser))
router.put('/user/unblock/:userId',TryCatchMiddleware(adminUnblockuser))

//Members
router.get('/viewAllmembers',TryCatchMiddleware(adminviewallMmebers))



//Products

router.post('/addProduct',TryCatchMiddleware(addProduct))
router.get('/products',TryCatchMiddleware(viewproduct))
router.get('/products/:productbyId',TryCatchMiddleware(adminviewProductbyid))
router.get('/products/category/:categoryname',TryCatchMiddleware(adminproductbycategery))
router.put('/products/edit/:productId',TryCatchMiddleware(admineditProduct))
router.delete('/products/delete/:productId',TryCatchMiddleware(admindeleteProductbyid))

//Borrows
router.get('/viewAllborrows',TryCatchMiddleware(admingetborrows))
//Reviews
router.get('/reviews',TryCatchMiddleware(admincangetReview))

// route.post('/addauthors',TryCatchMiddleware(addauthors))

//addmembership
router.post('/addmembership',TryCatchMiddleware(addMembership))

export default router;