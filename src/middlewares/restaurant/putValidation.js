import { INVALID_BODY } from '../../constants';

export const putValidation = (req, res, next) => {
    const { name, phoneNum, address, firstName, userName } = req.body;
    if (!firstName || !userName || !name || !phoneNum || !address || !Object.keys(address).includes('country' && 'street' && 'state' && 'city' && 'location' && 'postalCode')) {
        next(new Error(INVALID_BODY));
    } else {
        next();
    }
};
