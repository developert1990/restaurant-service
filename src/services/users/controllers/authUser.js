import { validateToken } from '../../../libs/validateToken';
import cookie from 'cookie';
import { failure, success } from '../../../libs';

export const authUser = (req, res, next) => {
    try {
        const cookies = cookie.parse(req.headers?.cookie);
        const result = validateToken(cookies);
        return success({
            status: 200,
            userInfo: result,
        }, res);
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        }, res);
    }

};
