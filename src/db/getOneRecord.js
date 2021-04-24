import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

export const getOneRecord = async ({ id, name }) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Key: { id, name },
    };
    return client.get(params).promise();
};
