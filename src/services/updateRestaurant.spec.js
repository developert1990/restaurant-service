import sinon from 'sinon';
import { UPDATE_SUCCESS } from '../constants/messages';
import * as db_updateRecord from '../db/updateOneRecord';
import { updateRestaurant } from './updateRestaurant';

describe('Services - updateRestaurant', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, jsonStub, sendStub, updateOneRecordStub;
    beforeEach(() => {
        jsonStub = sandbox.stub();
        sendStub = sandbox.stub();
        updateOneRecordStub = sandbox.stub(db_updateRecord, 'updateOneRecord');
        req = {
            body: {
                name: undefined,
                phoneNum: undefined,
                address: undefined,
                firstName: undefined,
                serName: undefined,
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
    it('Should call db function and returens json data', async () => {
        updateOneRecordStub.resolves();
        await updateRestaurant(req, res, next);
        sinon.assert.calledWith(res.json, UPDATE_SUCCESS);
        sinon.assert.calledOnce(updateOneRecordStub);
    });
    it('Should state 500 with error message', async () => {
        updateOneRecordStub.throws(new Error('Got an error to update'));
        await updateRestaurant(req, res, next);
        sinon.assert.notCalled(res.json);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(updateOneRecordStub);
        sinon.assert.calledWith(sendStub, 'Got an error to update');
    });

});
