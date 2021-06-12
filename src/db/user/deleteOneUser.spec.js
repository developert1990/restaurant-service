import sinon from 'sinon';
import { deleteOneUser } from './deleteOneUser';
import AWS from 'aws-sdk';
import * as lib_userId from '../../libs/createUserId';
import { config } from '../../config/dynamoConfig';

describe('db - deleteOneUser', () => {
    const sandbox = sinon.createSandbox();
    const promiseStub = sandbox.stub();
    const dynamodbStub = {
        delete: sandbox.stub().returns({ promise: promiseStub }),
    };
    let createUserIdStub;
    beforeEach(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(dynamodbStub);
        createUserIdStub = sandbox.stub(lib_userId, 'createUserId').returns('fakeId');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should call DynamoDB DELETE method with correct tableName', async () => {
        await deleteOneUser({ firstName: 'first', lastName: 'last' });
        const params = {
            TableName: config.tableName,
            Key: {
                id: createUserIdStub(),
            },
        };
        sinon.assert.calledOnce(dynamodbStub.delete);
        sinon.assert.calledWith(dynamodbStub.delete, params);
    });

});
