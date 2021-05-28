import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';
import { createRestaurantID, createRestaurantSK } from '../../libs';

export const addOneRecord = async ({ name, phoneNum, address, firstName, userName }) => {
    const { postalCode } = address;
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Item: {
            name,
            phoneNum,
            address,
            ownerId: createRestaurantSK({ firstName, userName }),
            id: createRestaurantID({ name, postalCode }),
        },
    };
    return client.put(params).promise();
};
