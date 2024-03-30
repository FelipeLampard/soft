import { byEmail } from "../models.js/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import { findError } from "../utils/utils.js";

const loginUser = async (req, res) => {
    try {

        const findUser = await byEmail(user)
        if (!findUser) {
            return await senderrorResponse(res, 'auth_01');

        }

        const isPasswordValid = bcrypt.compareSync(
            user.password,
            findUser.password
        )
        if (!isPasswordValid) {
            return await senderrorResponse(res, 'auth_02')
        }

        const { email, rol, languaje } = findUser
        const token = await createToken(email)
        res.status(200).json({
            message: 'Welcome, ${email} has iniciado sesión',
            code: 200,
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const createToken = async (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '60',
    });
    return token;
};

const senderrorResponse = async (res, errorCode) => {
    const errorFound = findError(errorCode);
    res.status(errorFound[0].status).json({ error: errorFound[0].message });
}

export {loginUser};


