import Joi from 'joi';
import lodashGet from 'lodash.get';

export const addUserValidation = ({ firstName, lastName, email, phoneNum }) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phoneNum: Joi.string().required(),
    });

    const result = schema.validate({ firstName, lastName, email, phoneNum });
    if (result.error) {
        const errorMsg = lodashGet(result, 'error.details[0].message', 'Generic error message');
        throw new Error(errorMsg);
    } else {
        return;
    }
};
