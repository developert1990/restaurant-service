import sinon from 'sinon';
import { deleteUser } from './deleteUser';
import * as db_addOne from '../../../db/user/deleteOneUser';
import * as lib_response from '../../../libs/response-lib';

describe('Services - deleteUser', () => {
    const sandbox = sinon.createSandbox();
    let res, req, next, successStub, failureStub, deleteOneUserStub;

    beforeEach(() => {
        deleteOneUserStub = sandbox.stub(db_addOne, 'deleteOneUser');
        successStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
        req = {
            body: undefined,
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should not call db function, return 409 with error message', async () => {
        req.query = { firstName: 'fn', lastName: 'ln', email: 'em' };
        deleteOneUserStub.throws();
        await deleteUser(req, res, next);
        sinon.assert.notCalled(successStub);
        sinon.assert.calledOnce(failureStub);
    });

    it('Should call db function, return 200 with message', async () => {
        req.query = { firstName: 'fn', lastName: 'ln', email: 'em' };
        deleteOneUserStub.resolves();
        await deleteUser(req, res, next);
        sinon.assert.notCalled(failureStub);
        sinon.assert.calledOnce(successStub);
    });

});
