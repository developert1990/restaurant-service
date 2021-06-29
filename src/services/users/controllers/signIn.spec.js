import sinon from 'sinon';
import { signin } from './signIn';
import * as db_getUser from '../../../db/user/getUser';
import * as lib_response from '../../../libs/response-lib';
import * as lib_match from '../../../libs/bcrypt';
import * as lib_token from '../../../libs/generateToken';
import * as lib_cookie from '../../../libs/cookies';

describe('Services - signin', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, successStub, failureStub, getUserStub, isMatchStub, tokenStub, setCookieStub;

    beforeEach(() => {
        getUserStub = sandbox.stub(db_getUser, 'getUser');
        successStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
        isMatchStub = sandbox.stub(lib_match, 'isMatch');
        tokenStub = sandbox.stub(lib_token, 'generateToken');
        setCookieStub = sandbox.stub(lib_cookie, 'setCookie');
        req = {
            body: undefined,
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('User does not exist, return 409 error', async () => {
        req.body = { 'email': 'fakeEmail', 'password': 'fakePassword' };
        getUserStub.resolves({ Count: 0 });
        await signin(req, res, next);
        sinon.assert.calledOnce(failureStub);
        sinon.assert.calledWith(failureStub, {
            status: 409,
            message: 'User does not exist',
        });
        sinon.assert.notCalled(successStub);
    });

    it('User exist, should call db function with 200', async () => {
        req.body = { 'email': 'fakeEmail', 'password': 'fakePassword' };
        getUserStub.resolves({ Items: [{ firstName: 'fn', lastName: 'ln', email: 'email' }], Count: 1 });
        isMatchStub.resolves(true);
        tokenStub.resolves('fakeToken');
        await signin(req, res, next);
        sinon.assert.notCalled(failureStub);
        sinon.assert.calledOnce(successStub);
    });

});
