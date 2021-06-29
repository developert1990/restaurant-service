import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';

export const getUser = async ({ email }) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    // IndexName: Name in Global Secondary Index
    const params = {
        TableName: config.tableName,
        IndexName: 'email-index',
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
            '#email': 'email',
        },
        ExpressionAttributeValues: {
            ':email': email,
        },
        Limit: 10,
        ScanIndexForward: false,
    };
    return dynamodb.query(params).promise();
};
