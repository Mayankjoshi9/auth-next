// Importing User Model
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(404).json({
                success: false,
                message: "data missing"
            })
        }
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        user.password = undefined;

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            user: user

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Signup = async (req, res) => {
    try {
        const { username, email, password, name, birthday, gender, description } = req.body;


        if (!username || !email || !password || !name || !birthday || !gender) {
            return res.status(404).json({
                success: false,
                message: "data missing"
            })
        }

        const userExists = await User.findOne({ email: email });
        const userNameExists = await User.findOne({ username: username });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        if (userNameExists) {
            return res.status(400).json({
                success: false,
                message: "User Name already taken"
            })
        }

        // password should be greater than 6 and have alteast 1 symbol and 1 uppercase
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long and have at least 1 number, 1 symbol and 1 uppercase letter"
            })
        }


        const today = new Date();
        const birthdate = new Date(birthday);
        // birthday should be in format YYYY-MM-DD
        const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdayRegex.test(birthday)) {
            return res.status(400).json({
                success: false,
                message: "Birthday must be in format YYYY-MM-DD"
            });
        }
        // birthday should not be in future
        if (birthdate > today) {
            return res.status(400).json({
                success: false,
                message: "Birthday should not be in future"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            email: email,
            password: hashPassword,
            name: name,
            birthday: birthdate,
            gender: gender,
            description: description
        });

        return res.status(200).json({
            success: true,

            message: "User registered successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Logout = async (req, res) => {
    try {
        return res.status(200).clearCookie("token").json({
            success: true,
            message: "User logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



