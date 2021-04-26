import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

export const getOneRecord = async ({ ownerId, id }) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Key: { ownerId, id },
    };
    return client.get(params).promise();
};
