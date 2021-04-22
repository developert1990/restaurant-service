import crypto from 'crypto';

export const createRestaurantPK = (name, street, postalCode) => {
    const data = name + street.replace(/ +/g, '') + postalCode;
    const cryptedId = crypto.createHash('md5').update(data).digest('hex');
    return cryptedId;
};
