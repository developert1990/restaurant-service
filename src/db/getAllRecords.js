import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

export const getAllRecords = async (id) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'id',
        },
        ExpressionAttributeValues: {
            ':id': id,
        },
    };
    return client.query(params).promise();
};
