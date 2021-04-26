import sinon from 'sinon';
import AWS from 'aws-sdk';
import { getAllRecords } from './getAllRecords';
import { config } from '../config/dynamoConfig';

describe('db - getAllRecords()', () => {
    const sandbox = sinon.createSandbox();
    const id = 'fakeID';
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
        await getAllRecords(id);
        const params = {
            TableName: config.tableName,
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeNames: {
                '#id': 'id',
            },
            ExpressionAttributeValues: {
                ':id': id,
            },
        };
        sinon.assert.calledWith(clientStub.query, params);
        sinon.assert.calledOnce(promiseStub);
    });
});
