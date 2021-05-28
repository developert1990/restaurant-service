import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';

export const getAllRecords = async (id) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'id',
        },
        ExpressionAttributeValues: {
            ':id': id,
        },
        Limit: 10,
        ScanIndexForward: false,
    };
    // const checkFirstCall = () => {
    //     if (!itemId && !charityId) {
    //         return params;
    //     }
    //     params.ExclusiveStartKey = {
    //         id,
    //         ownerId,
    //     };
    //     return params;
    // }; 
    return client.query(params).promise();
};
