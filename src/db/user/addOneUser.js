import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';
import { createUserId, encode } from '../../libs';

export const addOneUser = async ({ firstName, lastName, email, password }) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const datetime = new Date().toISOString();
    const encodedPassword = await encode(password);
    const params = {
        TableName: config.tableName,
        Item: {
            id: createUserId({ firstName, lastName }),
            firstName,
            lastName,
            email,
            password: encodedPassword,
            createdAt: datetime,
            updatedAt: datetime,
        },
    };

    return dynamoDb.put(params, (error, data) => {
        if (error) {
            console.error(error);
            return new Error(error);
        }
        return data;

    }).promise();
};
