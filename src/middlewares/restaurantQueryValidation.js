import Joi from 'joi';

export const schema = Joi.object({
    name: Joi.string().required(),
    street: Joi.required(),
    postalCode: Joi.string().required(),
});

export const restaurantQueryValidation = (req, res, next) => {
    const result = schema.validate(req.query);
    if (result.error) {
        next(new Error(result.error.details[0].message));
    } else {
        next();
    }
};
