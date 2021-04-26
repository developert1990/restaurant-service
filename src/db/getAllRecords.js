import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

export const getAllRecords = async (ownerId) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        KeyConditionExpression: '#ownerId = :ownerId',
        ExpressionAttributeNames: {
            '#ownerId': 'ownerId',
        },
        ExpressionAttributeValues: {
            ':ownerId': ownerId,
        },
    };
    return client.query(params).promise();
};
