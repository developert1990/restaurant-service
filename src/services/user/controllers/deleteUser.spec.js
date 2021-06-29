// import sinon from 'sinon';
// import { handler } from './deleteUser';
// import * as db_addOne from '../../../db/user/deleteOneUser';
// import * as lib_response from '../../../libs/response-lib';

// describe('Services - deleteUser', () => {
//     const sandbox = sinon.createSandbox();
//     let event, context, callback, successStub, failureStub, deleteOneUserStub;

//     beforeEach(() => {
//         deleteOneUserStub = sandbox.stub(db_addOne, 'deleteOneUser');
//         successStub = sandbox.stub(lib_response, 'success');
//         failureStub = sandbox.stub(lib_response, 'failure');
//         event = {
//             queryStringParameters: undefined,
//         };
//     });

//     afterEach(() => {
//         sandbox.restore();
//     });

//     it('Should not call db function, return 409 with error message', async () => {
//         event = { queryStringParameters: { firstName: 'first', lastName: undefined } };
//         deleteOneUserStub.throws();
//         await handler(event, context, callback);
//         sinon.assert.notCalled(successStub);
//         sinon.assert.calledOnce(failureStub);
//     });

//     it('Should call db function, return 200 with message', async () => {
//         event = { queryStringParameters: { firstName: 'first', lastName: 'last' } };
//         deleteOneUserStub.resolves();
//         await handler(event, context, callback);
//         sinon.assert.notCalled(failureStub);
//         sinon.assert.calledOnce(successStub);
//     });

// });
