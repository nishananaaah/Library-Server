import express from "express";
import { login, register } from "../CONTROLLERS/authenticationController.js";
import { userMembership } from "../CONTROLLERS/paymentController.js";

const route = express.Router();

route.post('/register',register);
route.post('/login',login)
// route.post('/membership',userMembership)

export default route;