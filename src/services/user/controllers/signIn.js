import { COOKIE_EXP } from '../../../constants';
import { getUser } from '../../../db/user/getUser';
import { isMatch, failure, success, generateToken } from '../../../libs';
import cors from 'cors';

export const handler = async (event, context, callback) => {
    const corsOption = {
        origin: 'http://localhost:3000',
        credentials: true,
        preFlightContinue: true,
    };
    cors(corsOption);
    const { email, password } = event.body.email ? event.body : JSON.parse(event.body);
    try {
        const userData = await getUser({ email, password });
        if (userData.Count == 0) throw new Error('User does not exist');
        const compared = await isMatch(password, userData.Items[0].password);
        if (!compared) throw new Error('Password is incorrect');
        const token = await generateToken(userData);
        const refreshToken = await generateToken(userData, COOKIE_EXP.REFRESH_TOKEN_EXP);
        const { firstName, lastName, email: userEmail } = userData.Items[0];
        return success({
            status: 200,
            userInfo: { firstName, lastName, userEmail },
        }, token, refreshToken);
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        });
    }
};
