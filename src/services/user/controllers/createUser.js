require('dotenv').config();
import { initialAWS } from '../../../config/awsConfig';
import { addOneUser } from '../../../db/user/addOneUser';
import { failure, success } from '../../../libs/response-lib';
import { addUserValidation } from '../../../middlewares/user/addUserValidation';

export const handler = async (event, context, callback) => {
    initialAWS();
    try {
        const info = event.body.firstName ? event.body : JSON.parse(event.body);
        const { firstName, lastName, email, phoneNum } = info;
        addUserValidation({ firstName, lastName, email, phoneNum });
        await addOneUser({ firstName, lastName, email, phoneNum });
        return success({
            status: 200,
            result: 'User has been successfully saved.',
        });
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        });
    }
};
