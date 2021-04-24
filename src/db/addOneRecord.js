import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';
import { createRestaurantPK } from '../libs/createRestaurantPK';

export const addOneRecord = async ({ name, phoneNum, address, firstName, userName }) => {
    const { street, postalCode } = address;
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Item: {
            name,
            phoneNum,
            address,
            id: createRestaurantPK({ firstName, userName }),
        },
    };
    return client.put(params).promise();
};
