import jwt from 'jsonwebtoken';

export const validateToken = (cookies) => {
    const { restaurant_token, restaurant_refresh_token } = cookies;
    let obj = {};
    jwt.verify(restaurant_token, process.env.JWT_SECRET, async (err, decode) => {
        if (err) throw new Error('Invalid Token');
        const { name, email, exp } = decode;
        obj = {
            name, email, exp,
        };
    });
    return obj;
};
