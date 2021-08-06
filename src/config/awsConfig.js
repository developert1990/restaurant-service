require('dotenv').config();
const AWS = require('aws-sdk');

const initialAWS = () => {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, PORT } = process.env;
    // if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    //     throw new Error('AWS_ACCESS_KEY or SECRET_KEY is not set');
    // }
    AWS.config.update({
        region: 'us-east-1',
    });
    return { PORT };
};

module.exports = {
    initialAWS,
};
