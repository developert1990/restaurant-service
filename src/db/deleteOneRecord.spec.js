import sinon from 'sinon';
import AWS from 'aws-sdk';
import { deleteOneRecord } from './deleteOneRecord';
import { config } from '../config/dynamoConfig';

const testParams = {
    id: 'testID',
    name: 'testName',
};

describe('db - deleteOneRecord()', () => {
    const sandbox = sinon.createSandbox();
    const promiseStub = sandbox.stub();
    const clientStub = {
        delete: sandbox.stub().returns({ promise: promiseStub }),
    };
    beforeEach(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(clientStub);
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Should call DynamoDB DELETE method with correct table name', async () => {
        const { id, name } = testParams;
        await deleteOneRecord({ id, name });
        const params = {
            TableName: config.tableName,
            Key: { id, name },
        };
        sinon.assert.calledWith(clientStub.delete, params);
        sinon.assert.calledOnce(promiseStub);
    });
});
