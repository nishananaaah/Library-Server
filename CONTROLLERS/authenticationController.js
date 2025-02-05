import User from "../MODELS/userModel.js";
import userAuthjoi from "../VALIDATION/userjoi.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { googleVerify, loginuser } from "../SERVICES/auth.js";

dotenv.config();
const jwtSecret = process.env.USER_JWT; // Use a separate secret for JWT

export const register = async (req, res, next) => {
    const { value, error } = userAuthjoi.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Found validation error", details: error.details });
    }
    const { username, email, password } = value;
    try {
        const isExistinguser = await User.findOne({ email });
        if (isExistinguser) {
            return res.status(400).json({ status: "error", message: "Email already taken!" });
        }

        const hashedpassword = await bcryptjs.hash(password, 10);

        const newuser = new User({
            username,
            image: req.cloudinaryImageUrl,
            email,
            password: hashedpassword,
        });

        await newuser.save();

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: newuser,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const isUservalid = await User.findOne({ email });
        if (!isUservalid) {
            return res.status(404).json({ error: "User not found" });
        }

        if (isUservalid.isDeleted) {
            return res.status(403).json({ error: "User is blocked" });
        }

        const validPass = bcryptjs.compareSync(password, isUservalid.password);
        if (!validPass) {
            return res.status(400).json({ error: "Wrong credentials" });
        }

        const token = jwt.sign({ id: isUservalid.id }, jwtSecret, { expiresIn: '1h' });
        const { password: hashedPassword, ...data } = isUservalid._doc;
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

        res
            .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json({ message: "User logged in successfully", user: data, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const googleauth = async (req, res) => {
    const { idToken } = req.body;
    try {
        const { email, picture, name } = await googleVerify(idToken);
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, name, image: picture });
        }
        const payload = { email, picture, name };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: "User login successful", user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};