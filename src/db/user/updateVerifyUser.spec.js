import sinon from 'sinon';
import AWS from 'aws-sdk';
import { updateVerifyUser } from './updateVerifyUser';

describe('db - getUser', () => {
    const sandbox = sinon.createSandbox();
    const promiseStub = sandbox.stub();
    const dynamodbStub = {
        update: sandbox.stub().returns({ promise: promiseStub }),
    };
    beforeEach(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(dynamodbStub);
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('Should call DynamoDB UPDATE method with correct table name', async () => {
        await updateVerifyUser({ id: 'fakeId', email: 'fakeEmail' });
        sinon.assert.calledOnce(dynamodbStub.update);
    });
});
