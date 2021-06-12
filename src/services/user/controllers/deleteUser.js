import { initialAWS } from '../../../config/awsConfig';
import { deleteOneUser } from '../../../db/user/deleteOneUser';
import { failure, success } from '../../../libs/response-lib';
import { deleteUserValidation } from '../../../middlewares/user/deleteUserValidation';

export const handler = async (event, context, callback) => {
    initialAWS();
    try {
        const info = event.queryStringParameters.firstName ? event.queryStringParameters : JSON.parse(event.queryStringParameters);
        const { firstName, lastName } = info;
        deleteUserValidation({ firstName, lastName });
        await deleteOneUser({ firstName, lastName });
        return success({
            status: 200,
            result: 'User has been successfully deleted.',
        });
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        });
    }
};
