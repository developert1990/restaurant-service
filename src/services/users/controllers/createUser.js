require('dotenv').config();
import { initialAWS } from '../../../config/awsConfig';
import { addOneUser } from '../../../db/user/addOneUser';
import { getUser } from '../../../db/user/getUser';
import { sendEmail } from '../../../libs/email';
import { failure, success } from '../../../libs/response-lib';
import { addUserValidation } from '../../../middlewares/user/addUserValidation';

export const createUser = async (req, res, next) => {
    initialAWS();
    try {
        const { firstName, lastName, email, password } = req.body;
        const userData = await getUser({ email });
        if (userData.Count > 0) throw new Error('Email already exist');
        const code = Math.floor((Math.random() * 1000000) + 1);
        await addOneUser({ firstName, lastName, email, password, code });
        sendEmail.welcomEmail(firstName, code);
        return success({
            status: 200,
            result: 'User has been successfully saved.',
        }, res);
    } catch (error) {
        return failure({
            status: 409,
            message: error.message,
        }, res);
    }
};
