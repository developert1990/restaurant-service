import sinon from 'sinon';
import { updateOneRecord } from './updateOneRecord';
import AWS from 'aws-sdk';
import { config } from '../config/dynamoConfig';
import * as createFakeSK from '../libs/createRestaurantSK';
import * as createFakeID from '../libs/createRestaurantID';

describe('db - updateOneRecord()', () => {
    const sandbox = sinon.createSandbox();
    let name, phoneNum, address, firstName, userName;
    const promiseStub = sandbox.stub();
    const clientStub = {
        update: sandbox.stub().returns({
            promise: promiseStub,
        }),
    };
    beforeEach(() => {
        sandbox.stub(createFakeSK, 'createRestaurantSK').returns('fakeSK');
        sandbox.stub(createFakeID, 'createRestaurantID').returns('fakeID');
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(clientStub);
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Should call DynamoDB update method', async () => {
        name = 'fakeName'; phoneNum = 'fakePhoneNum'; address = 'fakeAddress';
        firstName = 'fakeFirstName'; userName = 'fakeUserName';
        await updateOneRecord({ name, phoneNum, address, firstName, userName });
        const params = {
            TableName: config.tableName,
            Key: {
                id: 'fakeID',
                ownerId: 'fakeSK',
            },
        };
        // sinon.assert.calledWith(clientStub.update, params);
        sinon.assert.calledOnce(promiseStub);
    });
});
