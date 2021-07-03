import { COOKIE_NAME } from '../../../constants';
import { getUser } from '../../../db/user/getUser';
import { updateUser } from '../../../db/user/updateUser';
import { failure, success } from '../../../libs';
import { removeCookie } from '../../../libs/cookies';

export const signOut = async (req, res, next) => {
    try {
        const { email } = req.query;
        const { cartItems } = req.body;
        const result = await getUser({ email });
        const { id } = result.Items[0];
        if (cartItems && result.Count === 1) {
            const updateObj = { 'cartItems': cartItems };
            await updateUser(id, email, updateObj);
            removeCookie(COOKIE_NAME.RESTAURANT_COOKIE, res);
            removeCookie(COOKIE_NAME.RESTAURANT_COOKIE_REFRESH, res);
            return success({
                status: 200,
                message: 'Sign Out Success',
            }, res);
        }
        if (result.Count === 1) {
            removeCookie(COOKIE_NAME.RESTAURANT_COOKIE, res);
            removeCookie(COOKIE_NAME.RESTAURANT_COOKIE_REFRESH, res);
            return success({
                status: 200,
                message: 'Sign Out Success',
            }, res);
        } else {
            throw new Error('User does not existed');
        }
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        }, res);
    }
};
