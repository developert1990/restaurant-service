import sinon from 'sinon';
import { restaurantQueryValidation, schema } from './restaurantQueryValidation';

describe('middlewares - restaurantQueryValidation()', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, validatingStub;
    beforeEach(() => {
        req = {
            query: {
                name: undefined,
                firstName: undefined,
                userName: undefined,
            },
        };
        next = sandbox.stub();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('Missed street query - returns an error', () => {
        req.query.name = 'testName';
        req.query.userName = 'testRserName';
        restaurantQueryValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"firstName" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed name query query - returns an error', () => {
        req.query.street = 'testStreet';
        req.query.userName = 'testUserName';
        restaurantQueryValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"name" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed postalCode query - returns an error', () => {
        req.query.name = 'testName';
        req.query.firstName = 'testFirstName';
        restaurantQueryValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"userName" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('return Generic error message when details[0] path is not exist', () => {
        validatingStub = sandbox.stub(schema, 'validate');
        const validateionResult = { error: { details: undefined } };
        validatingStub.returns(validateionResult);
        restaurantQueryValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', 'Generic error message'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Call next() when inputs are all valid - Success', () => {
        req.query.name = 'testName';
        req.query.firstName = 'testFirstName';
        req.query.userName = 'testUserName';
        restaurantQueryValidation(req, res, next);
        sinon.assert.calledOnce(next);
    });
});
