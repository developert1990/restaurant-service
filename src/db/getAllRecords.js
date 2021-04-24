import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

export const getAllRecords = async (name) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'id',
        },
        ExpressionAttributeValues: {
            ':id': '6885103b60006d966b64422b37ab6381',
        },
    };
    return client.query(params).promise();
};
