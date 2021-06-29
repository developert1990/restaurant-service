# sangmean kwangmin
When include those two values into the .env file
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
I get an error looks like this: 
An error occurred: AuthLambdaFunction - Resource handler returned message: "Lambda was unable to configure your environment variables because the environment variables you have provided contains reserved keys that are currently not supported for modification. Reserved keys used in this request: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (Service: Lambda, Status Code: 400, Request ID: d59eb185-1284-4fac-9d02-f26f38e3ca05, Extended Request ID: null)" (RequestToken: 55349aae-4b8f-5b14-d925-5af72b58753c, HandlerErrorCode: InvalidRequest).

because cloudformation already assigned aws keys by default.
So remove those env value in your .env file.
or
I added exclude option in the serverless > custom > dotenv





lambda test

import sinon from 'sinon';
import { handler } from './createUser';
import * as db_addOne from '../../../db/user/addOneUser';
import * as lib_response from '../../../libs/response-lib';
import * as db_getUser from '../../../db/user/getUser';

describe('Services - createUser', () => {
    const sandbox = sinon.createSandbox();
    let event, context, callback, addOneUserStub, successStub, failureStub;

    beforeEach(() => {
        addOneUserStub = sandbox.stub(db_addOne, 'addOneUser');
        successStub = sandbox.stub(lib_response, 'success');
        failureStub = sandbox.stub(lib_response, 'failure');
        getUserStub = sandbox.stub(db_getUser, 'getUser');
        event = {
            body: undefined,
        };
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('Should not create User function, return 409 with "user already exist" message', async() => {
        
    });

    it('Should not call db function, return 409 error', async () => {
        event = { 'body': { 'firstName': 'first', 'lastName': 'last', 'email': 'email' } };
        addOneUserStub.throws();
        await handler(event, context, callback);
        sinon.assert.notCalled(addOneUserStub);
        sinon.assert.calledOnce(failureStub);
        sinon.assert.calledWith(failureStub, {
            status: 409,
            message: '\"password\" is required',
        });
    });

    it('Should call db function with 200', async () => {
        addOneUserStub.resolves();
        event = { 'body': { firstName: 'first', lastName: 'last', email: 'email', password: 'password' } };
        await handler(event, context, callback);
        sinon.assert.calledOnce(addOneUserStub);
        sinon.assert.calledOnce(successStub);
        sinon.assert.calledWith(successStub, {
            status: 200,
            result: 'User has been successfully saved.',
        });
    });

});
