
import { COOKIE_EXP } from '../constants/messages';
import jwt from 'jsonwebtoken';

export const generateToken = async (user, expiresIn = COOKIE_EXP.REGULAR_TOKEN_EXP) => {
    return jwt.sign({
        _id: user.id,
        name: user.firstName + user.lastName,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn }
    );
};
