import Joi from 'joi';
import lodashGet from 'lodash.get';

export const deleteAndGetOneValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
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
