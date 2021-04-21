import AWS from 'aws-sdk';

export const initialDynamo = () => {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, PORT } = process.env;
    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !PORT) {
        throw new Error('AWS_ACCESS_KEY, SECRET_KEY or PORT is not set');
    }
    AWS.config.update({
        region: 'us-east-1',
    });
};
