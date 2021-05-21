import sinon from 'sinon';
import { deleteRestaurant } from './deleteRestaurant';
import * as db_deleteOneRecord from '../db/deleteOneRecord';
import * as createFakePK from '../libs/createRestaurantSK';
import * as createFakeID from '../libs/createRestaurantID';
import { DELETE_SUCCESS } from '../constants/messages';

describe('Services - deleteRestaurant', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, jsonStub, sendStub, deleteOneRecordStub, createFakePKStub, createFakeIDStub;
    beforeEach(() => {
        jsonStub = sandbox.stub();
        sendStub = sandbox.stub();
        deleteOneRecordStub = sandbox.stub(db_deleteOneRecord, 'deleteOneRecord');
        createFakePKStub = sandbox.stub(createFakePK, 'createRestaurantSK').returns('fakePK');
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
    it('Should call db function and return json data', async () => {
        deleteOneRecordStub.resolves();
        await deleteRestaurant(req, res, next);
        sinon.assert.calledWith(res.json, DELETE_SUCCESS);
        sinon.assert.calledOnce(createFakePKStub);
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
