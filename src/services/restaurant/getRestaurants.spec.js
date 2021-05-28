import sinon from 'sinon';
import * as db_getAllRecords from '../../db/restaurant/getAllRecords';
import { getRestaurants } from './getRestaurants';
import * as createFakePK from '../../libs/createRestaurantID';

const mockData = {
    Items: [
        {
            name: 'test1',
            phoneNum: 1232,
        },
        {
            name: 'test2',
            phoneNum: 1232,
        },
        {
            name: 'test3',
            phoneNum: 1232,
        }
    ],
};

describe('Services - getRestaurants', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, jsonStub, sendStub, getAllRecordsStub;
    beforeEach(() => {
        jsonStub = sandbox.stub();
        sendStub = sandbox.stub();
        getAllRecordsStub = sandbox.stub(db_getAllRecords, 'getAllRecords');
        sandbox.stub(createFakePK, 'createRestaurantID').returns('fakePK');
        req = {
            query: {
                name: undefined,
                postalCode: undefined,
            },
        };
        res = {
            json: jsonStub,
            status: sandbox.stub().returns({
                send: sendStub,
            }),
        };
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Should call db function and returns json data', async () => {
        getAllRecordsStub.resolves(mockData);
        await getRestaurants(req, res, next);
        sinon.assert.calledWith(res.json, mockData);
        sinon.assert.calledOnce(getAllRecordsStub);
    });
    it('Should state 500 with error message', async () => {
        getAllRecordsStub.throws(new Error('Got an error to get all data'));
        await getRestaurants(req, res, next);
        sinon.assert.notCalled(res.json);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(sendStub, 'Got an error to get all data');
    });
});
