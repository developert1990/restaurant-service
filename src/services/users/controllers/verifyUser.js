import { getUser } from '../../../db/user/getUser';
import { updateVerifyUser } from '../../../db/user/updateVerifyUser';
import { failure, success } from '../../../libs';

export const verifyUser = async (req, res, next) => {
    try {
        const { email, code } = req.query;
        const result = await getUser({ email });
        const { id, code: userCode } = result.Items[0];
        if (code === userCode.toString()) {
            await updateVerifyUser({ id, email });
        } else {
            throw new Error('Verification failed. Please double check the code.');
        }
        return success({
            status: 200,
        }, res);
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        }, res);
    }

};
