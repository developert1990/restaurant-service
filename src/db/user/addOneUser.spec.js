import sinon from 'sinon';
import AWS from 'aws-sdk';
import { addOneUser } from './addOneUser';

describe('db - addOneUser', () => {
    const sandbox = sinon.createSandbox();
    const promiseStub = sandbox.stub();
    const dynamoDBStub = {
        put: sandbox.stub().returns({ promise: promiseStub }),
    };

    beforeEach(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(dynamoDBStub);

    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should call DynamoDB PUT method with correct table name', async () => {
        await addOneUser({ firstName: 'fname', lastName: 'lname', email: 'mail', phoneNum: 'pnum' });
        sinon.assert.calledOnce(dynamoDBStub.put);
    });

});
