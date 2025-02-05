import { OAuth2Client } from "google-auth-library";
import bcryptjs from "bcrypt";
import User from "../MODELS/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginuser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const checkpass = await bcryptjs.compare(password, user.password);
        if (!checkpass) {
            throw new Error("Password incorrect");
        }
        return user;
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

export const googleVerify = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, email_verified, name, picture } = payload;

        if (!email_verified) {
            throw new Error("Email is not verified");
        }
        return { email, picture, name };
    } catch (error) {
        throw new Error(`Google verification failed: ${error.message}`);
    }
};