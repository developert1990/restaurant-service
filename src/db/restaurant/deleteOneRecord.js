import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';

// Need PK and Sort Key to delete, getOne a data.
export const deleteOneRecord = async ({ ownerId, id }) => {
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.tableName,
        Key: { ownerId, id },
        // ConditionExpression: 'id = :id',
        // ExpressionAttributeValues: {
        //     ':id': id,
        // },
        ReturnValues: 'ALL_OLD',
    };
    return client.delete(params).promise();
};
