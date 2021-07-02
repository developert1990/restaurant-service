import { COOKIE_EXP, COOKIE_NAME, HTTP } from '../../../constants';
import { getUser } from '../../../db/user/getUser';
import { isMatch, failure, success, generateToken } from '../../../libs';
import { setCookie } from '../../../libs/cookies';

export const signin = async (req, res, next) => {
    const { email, password } = req.body.email ? req.body : JSON.parse(req.body);
    try {
        const data = await getUser({ email });
        if (data.Count === 0) throw new Error('User does not exist');
        const userData = data.Items[0];
        const compared = await isMatch(password, userData.password);
        if (!compared) throw new Error('Password is incorrect');
        if (!userData.verified) throw new Error('Your Email is not verified yet. Please verify the email to sign in.');
        const token = await generateToken(userData);
        const refreshToken = await generateToken(userData, COOKIE_EXP.REFRESH_TOKEN_EXP);
        const { firstName, lastName, email: userEmail } = userData;

        const httpOnly = HTTP.TRUE;
        setCookie(token, COOKIE_NAME.RESTAURANT_COOKIE, COOKIE_EXP.REGULAR_COOKIE_EXP, httpOnly, res);
        setCookie(refreshToken, COOKIE_NAME.RESTAURANT_COOKIE_REFRESH, COOKIE_EXP.REFRESH_COOKIE_EXP, httpOnly, res);
        return success({
            status: 200,
            userInfo: { firstName, lastName, userEmail },
        }, res);
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        }, res);
    }
};
