import sinon from 'sinon';
import { handler } from '../controllers/createUser';
import * as db_addOne from '../../../db/user/addOneUser';
import * as lib_response from '../../../libs/response-lib';

describe('Services - createUser', () => {
    const sandbox = sinon.createSandbox();
    let event, context, callback, addOneUserStub, successStub, failureStub;

    beforeEach(() => {
        addOneUserStub = sandbox.stub(db_addOne, 'addOneUser');
        successStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
    });
    afterEach(() => {
        sandbox.restore();
    });
    event = {
        body: undefined,
    };

    it('Should not call db function with 409 error', async () => {
        event = { 'body': { 'firstName': 'first', 'lastName': 'last', 'email': 'email' } };
        addOneUserStub.throws();
        await handler(event, context, callback);
        sinon.assert.notCalled(addOneUserStub);
        sinon.assert.calledOnce(failureStub);
        sinon.assert.calledWith(failureStub, {
            status: 409,
            message: '\"phoneNum\" is required',
        });
    });

    it('Should call db function with 200', async () => {
        addOneUserStub.resolves();
        event = { 'body': { firstName: 'first', lastName: 'last', email: 'email', phoneNum: 'phoneNum' } };
        await handler(event, context, callback);
        sinon.assert.calledOnce(addOneUserStub);
        sinon.assert.calledOnce(successStub);
        sinon.assert.calledWith(successStub, {
            status: 200,
            result: 'User has been successfully saved.',
        });
    });

});
