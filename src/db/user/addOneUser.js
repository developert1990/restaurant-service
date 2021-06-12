import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';
const uuid = require('uuid');

export const addOneUser = async ({ firstName, lastName, email, phoneNum }) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const datetime = new Date().toISOString();
    const params = {
        TableName: config.tableName,
        Item: {
            id: uuid.v1(),
            firstName,
            lastName,
            email,
            phoneNum,
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
