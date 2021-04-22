import sinon from 'sinon';
import AWS from 'aws-sdk';
import { addOneRecord } from './addOneRecord';
import { config } from '../config/dynamoConfig';
import * as createFakePK from '../libs/createRestaurantPK';
import { testParams } from '../constants/testingConstant';


describe('db - addOneRecord()', () => {
    const sandbox = sinon.createSandbox();
    sandbox.stub(createFakePK, 'createRestaurantPK').returns('fakePK');
    const promiseStub = sandbox.stub();
    const clientStub = {
        put: sandbox.stub().returns({ promise: promiseStub }),
    };

    beforeEach(() => {
        sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns(clientStub);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should call DynamoDB PUT method with correct table name', async () => {
        const name = testParams.name;
        const phoneNum = testParams.phoneNum;
        const address = testParams.address;
        await addOneRecord(name, phoneNum, address);
        const params = {
            TableName: config.tableName,
            Item: {
                'id': 'fakePK',
                'name': name,
                'phoneNum': phoneNum,
                'address': address,
            },
        };
        sinon.assert.calledWith(clientStub.put, params);
        sinon.assert.calledOnce(promiseStub);
    });

});
