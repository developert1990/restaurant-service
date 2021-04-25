import sinon from 'sinon';
import { getAllValidation, schema } from './getAllValidation';

describe('middlewares - getAllValidation()', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, validatingStub;
    beforeEach(() => {
        req = {
            query: {
                firstName: undefined,
                userName: undefined,
            },
        };
        next = sandbox.stub();
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Missed firstName query - return error', () => {
        req.query.userName = 'testUserName';
        getAllValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"firstName" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed userName query - return error', () => {
        req.query.firstName = 'testFirstName';
        getAllValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"userName" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Return Generic error message when details[0] path is not exist', () => {
        validatingStub = sandbox.stub(schema, 'validate');
        const validationResult = validatingStub.returns({ error: { details: undefined } });
        getAllValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', 'Generic error message'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Call next() when inputs are all valid - success', () => {
        req.query.firstName = 'testFirstName';
        req.query.userName = 'testUserName';
        getAllValidation(req, res, next);
        sinon.assert.calledOnce(next);
    });
});
