// import sinon from 'sinon';
// import { handler } from './signIn';
// import * as db_getUser from '../../../db/user/getUser';
// import * as lib_response from '../../../libs/response-lib';
// import * as lib_match from '../../../libs/bcrypt';
// import * as lib_token from '../../../libs/generateToken';

// describe('Services - signin', () => {
//     const sandbox = sinon.createSandbox();
//     let event, context, callback, successStub, failureStub, getUserStub, isMatchStub, tokenStub;

//     beforeEach(() => {
//         getUserStub = sandbox.stub(db_getUser, 'getUser');
//         successStub = sandbox.stub(lib_response, 'success');
//         failureStub = sandbox.stub(lib_response, 'failure');
//         isMatchStub = sandbox.stub(lib_match, 'isMatch');
//         tokenStub = sandbox.stub(lib_token, 'generateToken');
//         event = {
//             body: undefined,
//         };
//     });

//     afterEach(() => {
//         sandbox.restore();
//     });

//     it('User does not exist, return 409 error', async () => {
//         event = { 'body': { 'email': 'fakeEmail', 'password': 'fakePassword' } };
//         getUserStub.resolves({ Count: 0 });
//         await handler(event, context, callback);
//         sinon.assert.calledOnce(failureStub);
//         sinon.assert.calledWith(failureStub, {
//             status: 409,
//             message: 'User does not exist',
//         });
//         sinon.assert.notCalled(successStub);
//     });

//     it('User exist, should call db function with 200', async () => {
//         event = { 'body': { 'email': 'fakeEmail', 'password': 'fakePassword' } };
//         getUserStub.resolves({ Items: [{ firstName: 'fn', lastName: 'ln', email: 'email' }], Count: 1 });
//         isMatchStub.resolves(true);
//         tokenStub.resolves('fakeToken');
//         await handler(event, context, callback);
//         sinon.assert.notCalled(failureStub);
//         sinon.assert.calledOnce(successStub);
//     });

// });
