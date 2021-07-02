import sinon from 'sinon';
import { verifyUser } from './verifyUser';
import * as lib_response from '../../../libs/response-lib';
import * as db_updateVerifyUser from '../../../db/user/updateVerifyUser';
import * as db_getUser from '../../../db/user/getUser';

describe('Services - verifyUser', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, succesStub, failureStub, updateVerifyUserStub, getUserStub;
    beforeEach(() => {
        succesStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
        updateVerifyUserStub = sandbox.stub(db_updateVerifyUser, 'updateVerifyUser');
        getUserStub = sandbox.stub(db_getUser, 'getUser');
        req = {
            query: {
                email: undefined,
                code: undefined,
            },
        };
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Unmatched Code - return 409 with error message', async () => {
        req.query.email = 'fakeEmail';
        req.query.code = 'fakeCode';
        getUserStub.resolves({ Items: [{ id: 'fakeId', code: 'fake' }] });
        await verifyUser(req, res, next);
        sinon.assert.calledOnce(failureStub);
        sinon.assert.notCalled(succesStub);
        sinon.assert.calledWith(failureStub, { status: 409, message: 'Verification failed. Please double check the code.' });
    });
    it('Matched Code - return 200 ', async () => {
        req.query.email = 'fakeEmail';
        req.query.code = 'fakeCode';
        getUserStub.resolves({ Items: [{ id: 'fakeId', code: 'fakeCode' }] });
        updateVerifyUserStub.resolves();
        await verifyUser(req, res, next);
        sinon.assert.calledOnce(succesStub);
        sinon.assert.notCalled(failureStub);
        sinon.assert.calledWith(succesStub, { status: 200 });
    });
});
