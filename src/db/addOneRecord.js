import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

export const addOneRecord = async (name, phoneNum, address) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Item: {
            'name': name,
            'phoneNum': phoneNum,
            'address': address,
        },
    };
    return client.put(params).promise();
};
