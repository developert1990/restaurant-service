import sinon from 'sinon';
import { deleteRestaurant } from './deleteRestaurant';
import * as db_deleteOneRecord from '../../db/restaurant/deleteOneRecord';
import * as createFakeSK from '../../libs/createRestaurantSK';
import * as createFakeID from '../../libs/createRestaurantID';
import { DELETE_FAIL, DELETE_SUCCESS } from '../../constants/messages';

describe('Services - deleteRestaurant', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, jsonStub, sendStub, deleteOneRecordStub, createFakeSKStub, createFakeIDStub;
    beforeEach(() => {
        jsonStub = sandbox.stub();
        sendStub = sandbox.stub();
        deleteOneRecordStub = sandbox.stub(db_deleteOneRecord, 'deleteOneRecord');
        createFakeSKStub = sandbox.stub(createFakeSK, 'createRestaurantSK').returns('fakePK');
        createFakeIDStub = sandbox.stub(createFakeID, 'createRestaurantID').returns('fakeID');
        req = {
            query: {
                name: undefined,
                postalCode: undefined,
                firstName: undefined,
                userName: undefined,
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
    it('NO item to delete, Should call db function and return json data with DELETE_FAIL', async () => {
        deleteOneRecordStub.resolves({});
        await deleteRestaurant(req, res, next);
        sinon.assert.calledWith(res.json, DELETE_FAIL);
        sinon.assert.calledOnce(createFakeSKStub);
        sinon.assert.calledOnce(deleteOneRecordStub);
    });
    it('Item deleted, Should call db function and return json data', async () => {
        deleteOneRecordStub.resolves({ Attribute: 'random' });
        await deleteRestaurant(req, res, next);
        sinon.assert.calledWith(res.json, DELETE_SUCCESS);
        sinon.assert.calledOnce(createFakeSKStub);
        sinon.assert.calledOnce(deleteOneRecordStub);
    });
    it('Should state 500 with error message', async () => {
        deleteOneRecordStub.throws(new Error('Got an error to delete'));
        await deleteRestaurant(req, res, next);
        sinon.assert.notCalled(res.json);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(sendStub, 'Got an error to delete');
    });
});
