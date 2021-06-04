require('dotenv').config();
const { initialAWS } = require('../config/awsConfig');
const AWS = require('aws-sdk');

const sendUserDataToQueue = async ({ username, email, firstName, lastName }) => {
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    const params = {
        QueueUrl: process.env.QUEUE_URL,
    };
};
