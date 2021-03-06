import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';
import { createUserId } from '../../libs';

export const deleteOneUser = async ({ firstName, lastName, email }) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Key: {
            id: createUserId({ firstName, lastName }),
            email,
        },
    };
    return dynamodb.delete(params).promise();
};
