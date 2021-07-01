import sinon from 'sinon';
import { authUser } from './authUser';
import * as lib_validateToken from '../../../libs/validateToken';
import * as lib_response from '../../../libs/response-lib';
import cookie from 'cookie';

describe('Services - authUser()', () => {
    const sandbox = sinon.createSandbox();
    let cookieStub, successStub, failureStub, validateTokenStub, req, res, next;
    beforeEach(() => {
        cookieStub = sandbox.stub(cookie, 'parse');
        successStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
        validateTokenStub = sandbox.stub(lib_validateToken, 'validateToken');
        req = {
            headers: {
                cookie: undefined,
            },
        };
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('Fail to validate token - reutrn 409 with error message', () => {
        cookieStub.returns('fakeCookie');
        validateTokenStub.throws(new Error('Invalid Token'));
        authUser(req, res, next);
        sinon.assert.calledOnce(failureStub);
        sinon.assert.notCalled(successStub);
    });

    it('Fail with no cookies - reutrn 409 with error message', () => {
        cookieStub.throws();
        // both works
        validateTokenStub.throws(new Error('Invalid Token'));
        // validateTokenStub.returns();
        authUser(req, res, next);
        sinon.assert.calledOnce(failureStub);
        sinon.assert.notCalled(successStub);
    });

    it('Success to validate token - return 200 with user data', () => {
        cookieStub.returns('fakeCookie');
        validateTokenStub.returns();
        authUser(req, res, next);
        sinon.assert.calledOnce(successStub);
        sinon.assert.notCalled(failureStub);
    });

});
