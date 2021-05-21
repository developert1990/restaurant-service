import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';
import { createRestaurantID, createRestaurantSK } from '../libs';

// if change name or postalCode or firstName, userName => will create new row. => 업데이트 할때 프론트에서 이 네개는 못바꾸게 하면될듯
export const updateOneRecord = async ({ name, phoneNum, address, firstName, userName }) => {
    const { postalCode } = address;
    const client = new AWS.DynamoDB.DocumentClient();

    let getUpdateParams = (attributes) => {
        const attributeNames = {};
        const attributeValues = {};
        const setExpressions = [];
        for (const [key, val] of Object.entries(attributes)) {
            attributeNames[`#${key}`] = key;
            attributeValues[`:${key}`] = val;
            setExpressions.push(`#${key} = :${key}`);
        }
        const updateExpression = 'set ' + setExpressions.join(', ');
        return {
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: { ...attributeNames },
            ExpressionAttributeValues: { ...attributeValues },
        };
    };
    let baseParams = {
        TableName: config.tableName,
        Key: {
            id: createRestaurantID({ name, postalCode }),
            ownerId: createRestaurantSK({ firstName, userName }),
        },
    };
    const params = {
        ...baseParams, ...getUpdateParams({ name, phoneNum, address, firstName, userName }),
    };
    return client.update(params).promise();
};
