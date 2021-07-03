import sinon from 'sinon';
import AWS from 'aws-sdk';
import { updateUser } from './updateUser';

describe('db - updateUser()', () => {
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
        const updateObj = { 'verified': true };
        await updateUser('fakeId', 'fakeEmail', updateObj);
        sinon.assert.calledOnce(dynamodbStub.update);
    });
});
