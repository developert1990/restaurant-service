import crypto from 'crypto';

export const createRestaurantID = ({ name, postalCode }) => {
    const data = name + postalCode;
    return crypto.createHash('md5').update(data).digest('hex');
};
