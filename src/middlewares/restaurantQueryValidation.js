import Joi from 'joi';
import lodashGet from 'lodash.get';

export const schema = Joi.object({
    name: Joi.string().required(),
    street: Joi.required(),
    postalCode: Joi.string().required(),
});

export const restaurantQueryValidation = (req, res, next) => {
    const result = schema.validate(req.query);
    if (result.error) {
        const errorMsg = lodashGet(result, 'error.details[0].message', 'Generic error message');
        next(new Error(errorMsg));
    } else {
        next();
    }
};
