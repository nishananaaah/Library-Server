import express from "express";
import { googleauth, login, register } from "../CONTROLLERS/authenticationController.js";
import uploadImage from "../MIDDLEWARES/uploadMiddleware.js";

const route = express.Router();

route.post('/register', uploadImage, register);
route.post('/login', login);
route.post("/googlelogin", googleauth);

export default route;