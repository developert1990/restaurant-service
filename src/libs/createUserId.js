import crypto from 'crypto';

export const createUserId = ({ firstName, lastName }) => {
    const data = firstName + lastName;
    return crypto.createHash('md5').update(data).digest('hex');
};
