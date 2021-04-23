import { INVALID_BODY } from '../constants/messages';

export const putValidation = (req, res, next) => {
    const { name, phoneNum, address } = req.body;
    if (!name || !phoneNum || !address || !Object.keys(address).includes('country' && 'street' && 'state' && 'city' && 'location' && 'postalCode')) {
        next(new Error(INVALID_BODY));
    } else {
        next();
    }
};
