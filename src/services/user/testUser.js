import { initialAWS } from '../../config/awsConfig';
import AWS from 'aws-sdk';

export const testUser = (req, res, next) => {
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
        MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/418329235064/user-queue',
    };
    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.log("Error", err);
            res.json('message has not been sent');
        } else {
            console.log("Success", data.MessageId);
            res.json('message has been sent');
        }
    });
};
