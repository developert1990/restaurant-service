require('dotenv').config();
const AWS = require('aws-sdk');
const { initialAWS } = require('../../../config/awsConfig');
const { config } = require('../../../config/dynamoConfig');
const uuid = require('uuid');

exports.handler = (event, context, callback) => {
    console.log('event 홍상민:>> ', event);
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    initialAWS();
    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);
    const { firstName, lastName, email, phoneNum } = data;
    console.log('firstName :>> ', firstName);
    console.log('lastName :>> ', lastName);
    console.log('email :>> ', email);
    console.log('phoneNum :>> ', phoneNum);
    console.log('process.env.AWS_ACCESS_KEY_ID :>> ', process.env.AWS_ACCESS_KEY_ID);
    console.log('process.env.AWS_SECRET_ACCESS_KEY :>> ', process.env.AWS_SECRET_ACCESS_KEY);
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

    dynamoDb.put(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(data.Item),
        };

        callback(null, response);
    });
    return { message: 'good..' };
};
