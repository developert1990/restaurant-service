import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';

export const updateVerifyUser = async ({ id, email }) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Key: {
            'id': id,
            'email': email,
        },
        UpdateExpression: 'set verified = :v',
        ExpressionAttributeValues: {
            ':v': true,
        },
        ReturnValues: 'UPDATED_NEW',
    };
    return dynamodb.update(params, (error, data) => {
        if (error) {
            return new Error(error);
        }
        return data;
    }).promise();
};
