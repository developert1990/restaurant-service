import Joi from 'joi';
import lodashGet from 'lodash.get';

export const deleteUserValidation = ({ firstName, lastName }) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    });
    const result = schema.validate({ firstName, lastName });
    if (result.error) {
        const errorMsg = lodashGet(result, 'error.details[0].message', 'Generic error message');
        throw new Error(errorMsg);
    } else {
        return;
    }
};
