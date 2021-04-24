import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

export const deleteOneRecord = async ({ id, name }) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Key: { id, name },
    };
    return client.delete(params).promise();
};
