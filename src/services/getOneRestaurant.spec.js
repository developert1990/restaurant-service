import sinon from 'sinon';
import { getOneRestaurant } from './getOneRestaurant';
import * as db_getOneRecord from '../db/getOneRecord';
import * as createFakePK from '../libs/createRestaurantPK';

const mockData = {
    Item: {
        address: {
            country: 'Canada',
            city: 'Calgary',
            street: '603 303 57Ave',
            postalCode: 'T2H2S4',
            location: {
                lat: 123,
                lon: 4556,
            },
            state: 'Alberta',
            check: 'good',
        },
        id: 'e920b2a21c17e6e1da3129ad864e0df3',
        name: 'test1',
        phoneNum: 1232,
    },
};

describe('Services - getOneRestaurant', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, getOneRecordStub, jsonStub, sendStub;

    beforeEach(() => {
        jsonStub = sandbox.stub();
        sendStub = sandbox.stub();
        getOneRecordStub = sandbox.stub(db_getOneRecord, 'getOneRecord');
        sandbox.stub(createFakePK, 'createRestaurantPK').returns('fakePK');
        req = {
            query: {
                name: null,
                street: null,
                postalCode: null,
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
        getOneRecordStub.resolves(mockData);
        await getOneRestaurant(req, res, next);
        sinon.assert.calledWith(res.json, mockData);
        sinon.assert.calledOnce(getOneRecordStub);
    });
    it('Should state 500 with error message', async () => {
        getOneRecordStub.throws(new Error('Got an error to get one record'));
        await getOneRestaurant(req, res, next);
        sinon.assert.notCalled(res.json);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(sendStub, 'Got an error to get one record');
    });

});
