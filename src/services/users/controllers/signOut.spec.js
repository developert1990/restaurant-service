import sinon from 'sinon';
import { signOut } from './signOut';
import * as lib_response from '../../../libs/response-lib';
import * as lib_cookies from '../../../libs/cookies';
import * as db_updateUser from '../../../db/user/updateUser';
import * as db_getUser from '../../../db/user/getUser';

describe(`Services - signOut()`, () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, successStub, failureStub, getUserStub, updateUserStub, removeCookiesStub;
    beforeEach(() => {
        getUserStub = sandbox.stub(db_getUser, 'getUser');
        updateUserStub = sandbox.stub(db_updateUser, 'updateUser');
        successStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
        removeCookiesStub = sandbox.stub(lib_cookies, 'removeCookie');
        req = {
            query: { email: undefined },
            body: { cartItems: undefined },
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('No user found, return 409 with error message', async () => {
        getUserStub.resolves({ Items: [{ id: 'fakeid' }], Count: 0 });
        await signOut(req, res, next);
        sinon.assert.notCalled(successStub);
        sinon.assert.calledWith(failureStub, {
            status: 409,
            message: 'User does not existed',
        });
    });

    it('Success, return 200 with success message', async () => {
        getUserStub.resolves({ Items: [{ id: 'fakeid' }], Count: 1 });
        removeCookiesStub.returns();
        req.query.email = 'fakeEmail';
        req.body.cartItems = 'fakeCartItems';
        await signOut(req, res, next);
        sinon.assert.calledWith(successStub, {
            status: 200,
            message: 'Sign Out Success',
        });
        sinon.assert.notCalled(failureStub);
    });

});
