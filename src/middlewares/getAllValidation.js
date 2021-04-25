import Joi from 'joi';
import lodashGet from 'lodash.get';

export const getAllValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        userName: Joi.string().required(),
    });

    const result = schema.validate(req.query);
    if (result.error) {
        const errorMsg = lodashGet(result, 'error.details[0].message', 'Generic error message');
        next(new Error(errorMsg));
    } else {
        next();
    }
};
