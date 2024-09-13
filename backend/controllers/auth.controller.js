import bcrypt from "bcryptjs";
import { User } from "../models/auth.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hour
        });

        // Save the user before sending the response
        await user.save();

        // jwt
        generateTokenAndSetCookie(res, user._id);

        // Send verification email
        sendVerificationEmail(user.email, verificationToken);

        // Send the response after saving the user and sending the email
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Or Expire verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Eamil verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in verifying email: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const login = async (req, res) => {
    res.send("Login Route");
};

export const logout = async (req, res) => {
    res.send("Logout Route");
};

