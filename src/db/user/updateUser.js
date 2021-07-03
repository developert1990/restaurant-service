import AWS from 'aws-sdk';
import { config } from '../../config/dynamoConfig';
import _ from 'lodash';

export const updateUser = async (id, email, updateObj) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const updateTime = new Date().getTime();
    const params = {
        TableName: config.tableName,
        Key: {
            'id': id,
            'email': email,
        },
        UpdateExpression: `set #updatedAt = :updatedAt`,
        ExpressionAttributeValues: {
            ':updatedAt': updateTime,
        },
        ExpressionAttributeNames: {
            '#updatedAt': 'updatedAt',
        },
        ReturnValues: 'UPDATED_NEW',
    };
    _.forEach(updateObj, (item, key) => {
        if (!['id', 'email'].includes(key)) {
            params.UpdateExpression += `, #${key} = :${key}`;
            params.ExpressionAttributeValues[`:${key}`] = item;
            params.ExpressionAttributeNames[`#${key}`] = key;
        };
    });
    return dynamodb.update(params, (error, data) => {
        if (error) {
            return new Error(error);
        }
        return data;
    }).promise();
};

// both of logics are same function.

// for (const [item, key] of Object.entries(updateObj)) {
//     console.log('item 엔트리 :>> ', item);
//     console.log('key 엔트리:>> ', key);
// }

// _.forEach(updateObj, (item, key) => {
//     console.log('item :>> ', item);
//     console.log('key :>> ', key);
// });
