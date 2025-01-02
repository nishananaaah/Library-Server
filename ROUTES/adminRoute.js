import express from "express";
import  login, { adminBlockuser, adminUnblockuser, adminviewbyUsername, adminviewUserbyid, viewAllusers }  from "../CONTROLLERS/adminController.js";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";
import { addProduct, admindeleteProductbyid, admineditProduct, adminproductbycategery, adminviewProductbyid } from "../CONTROLLERS/adminproductController.js";
import { viewproduct } from "../CONTROLLERS/productController.js";
import route from "./productRoute.js";

const router = express.Router();

//Admin Login
router.post('/login',TryCatchMiddleware(login))

//Users
router.get('/viewAllusers',TryCatchMiddleware(viewAllusers))
router.get('/user/:userId',TryCatchMiddleware(adminviewUserbyid))
router.get('/user/findname/:username',TryCatchMiddleware(adminviewbyUsername))
router.put('/user/block/:userId',TryCatchMiddleware(adminBlockuser))
router.put('/user/unblock/:userId',TryCatchMiddleware(adminUnblockuser))



//Products

router.post('/addProduct',TryCatchMiddleware(addProduct))
router.get('/products',TryCatchMiddleware(viewproduct))
router.get('/products/:productbyId',TryCatchMiddleware(adminviewProductbyid))
router.get('/products/category/:categoryname',TryCatchMiddleware(adminproductbycategery))
router.put('/products/edit/:productId',TryCatchMiddleware(admineditProduct))
router.delete('/products/delete/:productId',TryCatchMiddleware(admindeleteProductbyid))



export default router;