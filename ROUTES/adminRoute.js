import express from "express";
import  login  from "../CONTROLLERS/adminController.js";
import TryCatchMiddleware from "../MIDDLEWARES/trycatchMiddleware.js";

const router = express.Router();
router.post('/login',TryCatchMiddleware(login))
export default router;