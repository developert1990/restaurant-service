import sinon from 'sinon';
import { addRestaurant } from './addRestaurant';
import * as db_addOne from '../../db/restaurant/addOneRecord';
import { ADD_SUCCESS } from '../../constants/messages';

describe('Services - addRestaurant', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, addOneRecordStub, jsonStub, sendStub;

    beforeEach(() => {
        sendStub = sandbox.stub();
        jsonStub = sandbox.stub();
        addOneRecordStub = sandbox.stub(db_addOne, 'addOneRecord');
        req = {
            body: {
                name: null,
                phoneNum: null,
                address: null,
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
        addOneRecordStub.resolves();
        await addRestaurant(req, res, next);
        sinon.assert.calledWith(res.json, ADD_SUCCESS);
        sinon.assert.calledOnce(addOneRecordStub);
    });
    it('Should state 500 with error message', async () => {
        addOneRecordStub.throws(new Error('Got an error'));
        await addRestaurant(req, res, next);
        sinon.assert.notCalled(res.json);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(sendStub, 'Got an error');
    });
});
