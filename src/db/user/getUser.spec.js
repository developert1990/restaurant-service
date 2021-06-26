import sinon from 'sinon';
import AWS from 'aws-sdk';
import { getUser } from './getUser';

describe('db - getUser', () => {
    const sandbox = sinon.createSandbox();
    const promiseStub = sandbox.stub();
    const dynamoDBStub = {
        query: sandbox.stub().returns({ promise: promiseStub }),
    };
    beforeEach(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(dynamoDBStub);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should call DynamoDB QUERY method with correct table name', async () => {
        await getUser({ email: 'email', password: 'pw' });
        sinon.assert.calledOnce(dynamoDBStub.query);
    });
});
