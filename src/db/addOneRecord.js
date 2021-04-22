import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';
import { createRestaurantPK } from '../libs/createRestaurantPK';

export const addOneRecord = async (name, phoneNum, address) => {
    const { street, postalCode } = address;
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Item: {
            'id': createRestaurantPK(name, street, postalCode),
            'name': name,
            'phoneNum': phoneNum,
            'address': address,
        },
        // ConditionExpression: 'attribute_not_exists(PK)',
    };
    return client.put(params).promise();
};
