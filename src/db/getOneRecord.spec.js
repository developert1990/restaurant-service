import sinon from 'sinon';
import { getOneRecord } from './getOneRecord';
import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';

describe('db - getOneRecord()', () => {
    const sandbox = sinon.createSandbox();
    let pk, name;
    const promiseStub = sandbox.stub();
    const clientStub = {
        get: sandbox.stub().returns({
            promise: promiseStub,
        }),
    };
    before(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(clientStub);
    });
    after(() => {
        sandbox.restore();
    });
    it('Should call DynamoDB get method', async () => {
        await getOneRecord(pk = 'fakePK', name = 'fakeName');
        const params = {
            TableName: config.tableName,
            Key: {
                id: pk,
                name,
            },
        };
        sinon.assert.calledWith(clientStub.get, params);
        sinon.assert.calledOnce(promiseStub);
    });
});
