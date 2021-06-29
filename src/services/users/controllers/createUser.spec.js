import sinon from 'sinon';
import { createUser } from './createUser';
import * as db_addOne from '../../../db/user/addOneUser';
import * as lib_response from '../../../libs/response-lib';
import * as db_getUser from '../../../db/user/getUser';

describe('Services - createUser', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, addOneUserStub, successStub, failureStub, getUserStub;

    beforeEach(() => {
        addOneUserStub = sandbox.stub(db_addOne, 'addOneUser');
        successStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
        getUserStub = sandbox.stub(db_getUser, 'getUser');
        req = {
            body: undefined,
        };
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('Should not create User function, return 409 with "user already exist" message', async () => {
        getUserStub.resolves({ Count: 1 });
        req.body = { firstName: 'fn', lastName: 'ln', password: 'pw', email: 'em' };
        await createUser(req, res, next);
        sinon.assert.notCalled(addOneUserStub);
        sinon.assert.calledWith(failureStub, {
            status: 409,
            message: 'Email already exist',
        });
    });

    it('Should not call db function, return 409 error', async () => {
        req.body = { firstName: 'fn', lastName: 'ln', password: 'pw', email: 'em' };
        addOneUserStub.throws();
        getUserStub.resolves({ Count: 0 });
        await createUser(req, res, next);
        sinon.assert.calledOnce(failureStub);
    });

    it('Should call db function with 200', async () => {
        addOneUserStub.resolves();
        getUserStub.resolves({ Count: 0 });
        req.body = { firstName: 'fn', lastName: 'ln', password: 'pw', email: 'em' };
        await createUser(req, res, next);
        sinon.assert.calledOnce(addOneUserStub);
        sinon.assert.calledOnce(successStub);
        sinon.assert.calledWith(successStub, {
            status: 200,
            result: 'User has been successfully saved.',
        });
    });

});
