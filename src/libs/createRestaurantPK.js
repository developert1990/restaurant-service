import crypto from 'crypto';

export const createRestaurantPK = ({ firstName, userName }) => {
    const data = firstName + userName;
    return crypto.createHash('md5').update(data).digest('hex');
};
