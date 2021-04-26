import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';
import { createRestaurantID, createRestaurantPK } from '../libs';

export const addOneRecord = async ({ name, phoneNum, address, firstName, userName }) => {
    const { postalCode } = address;
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Item: {
            name,
            phoneNum,
            address,
            ownerId: createRestaurantPK({ firstName, userName }),
            id: createRestaurantID({ name, postalCode }),
        },
    };
    return client.put(params).promise();
};
