import express from "express";
import { login, register } from "../CONTROLLERS/authenticationController.js";
// import { userMembership } from "../CONTROLLERS/paymentController.js";
import uploadImage from "../MIDDLEWARES/uploadMiddleware.js";

const route = express.Router();

route.post('/register',uploadImage,register);
route.post('/login',login)
// route.post('/membership',userMembership)

export default route;