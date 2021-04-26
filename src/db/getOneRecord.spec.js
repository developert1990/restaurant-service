import sinon from 'sinon';
import { getOneRecord } from './getOneRecord';
import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

describe('db - getOneRecord()', () => {
    const sandbox = sinon.createSandbox();
    let id, ownerId;
    const promiseStub = sandbox.stub();
    const clientStub = {
        get: sandbox.stub().returns({
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
        id = 'fakePK';
        ownerId = 'fakeOwnerId';
        await getOneRecord({ ownerId, id });
        const params = {
            TableName: config.tableName,
            Key: { ownerId, id },
        };
        sinon.assert.calledWith(clientStub.get, params);
        sinon.assert.calledOnce(promiseStub);
    });
});
