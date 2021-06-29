
import { deleteOneUser } from '../../../db/user/deleteOneUser';
import { failure, success } from '../../../libs/response-lib';

export const deleteUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email } = req.query;
        await deleteOneUser({ firstName, lastName, email });
        return success({
            status: 200,
            result: 'User has been successfully deleted.',
        }, res);
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        }, res);
    }
};
