import { COOKIE_EXP } from '../../../constants';
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
        const token = await generateToken(userData);
        const refreshToken = await generateToken(userData, COOKIE_EXP.REFRESH_TOKEN_EXP);
        const { firstName, lastName, email: userEmail } = userData;
        setCookie({ token, refreshToken }, res);
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
