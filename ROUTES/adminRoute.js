import express from "express";
import  login, { adminviewUserbyId, viewAllusers }  from "../CONTROLLERS/adminController.js";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";

const router = express.Router();

//Admin Login
router.post('/login',TryCatchMiddleware(login))

router.get('/viewAllusers',TryCatchMiddleware(viewAllusers))
router.get('/user/:id',TryCatchMiddleware(adminviewUserbyId))

export default router;