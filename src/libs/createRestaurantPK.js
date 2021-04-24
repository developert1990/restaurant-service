import crypto from 'crypto';

export const createRestaurantPK = ({ firstName, userName }) => {
    const data = firstName + userName;
    const cryptedId = crypto.createHash('md5').update(data).digest('hex');
    return cryptedId;
};
