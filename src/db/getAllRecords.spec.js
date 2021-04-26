import sinon from 'sinon';
import AWS from 'aws-sdk';
import { getAllRecords } from './getAllRecords';
import { config } from '../config/dynamoConfig';

describe('db - getAllRecords()', () => {
    const sandbox = sinon.createSandbox();
    const ownerId = 'fakeOwnerID';
    const promiseStub = sandbox.stub();
    const clientStub = {
        query: sandbox.stub().returns({
            promise: promiseStub,
        }),
    };
    beforeEach(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(clientStub);
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Should call DynamoDB get method', async () => {
        await getAllRecords(ownerId);
        const params = {
            TableName: config.tableName,
            KeyConditionExpression: '#ownerId = :ownerId',
            ExpressionAttributeNames: {
                '#ownerId': 'ownerId',
            },
            ExpressionAttributeValues: {
                ':ownerId': ownerId,
            },
        };
        sinon.assert.calledWith(clientStub.query, params);
        sinon.assert.calledOnce(promiseStub);
    });
});
