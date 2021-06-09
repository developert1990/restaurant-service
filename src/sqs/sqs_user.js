require('dotenv').config();
const { initialAWS } = require('../config/awsConfig');
const AWS = require('aws-sdk');

const sendUserDataToQueue = async (url, { username, email, firstName, lastName }) => {
    initialAWS();
    const sqs = new AWS.SQS({ apiVersion: '2021-05-24' });
    const params = {
        DelaySeconds: 10,
        MessageAttributes: {
            'Title': {
                DataType: 'String',
                StringValue: 'The Whistler',
            },
            'Author': {
                DataType: 'String',
                StringValue: 'John Grisham',
            },
            'WeeksOn': {
                DataType: 'Number',
                StringValue: '6',
            },
        },
        MessageBody: `Sangmean Hong sqs testing ${username}, ${email}, ${firstName}, ${lastName} !!!!!!`,
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: url,
    };
    sqs.sendMessage(params, (err, data) => {
        if (err) {
            res.json('message has not been sent');
        } else {
            res.json('message has been sent');
        }
    });
};

module.exports = {
    sendUserDataToQueue,
};
