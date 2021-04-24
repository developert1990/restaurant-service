import sinon from 'sinon';
import AWS from 'aws-sdk';
import { addOneRecord } from './addOneRecord';
import { config } from '../config/dynamoConfig';
import * as createFakePK from '../libs/createRestaurantPK';

const testParams = {
    name: 'sangmean',
    phoneNum: 7777,
    address: { City: 'Calgary', Country: 'Canada', street: '57Ave', postalCode: 'T2H' },
};

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
        const { address, name, phoneNum } = testParams;
        await addOneRecord({ name, phoneNum, address });
        const params = {
            TableName: config.tableName,
            Item: {
                name,
                phoneNum,
                address,
                'id': 'fakePK',
            },
        };
        sinon.assert.calledWith(clientStub.put, params);
        sinon.assert.calledOnce(promiseStub);
    });

});
