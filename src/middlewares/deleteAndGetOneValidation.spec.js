import sinon from 'sinon';
import { deleteAndGetOneValidation, schema } from './deleteAndGetOneValidation';
import Joi from 'joi';

describe('middlewares - deleteAndGetOneValidation()', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next;
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
        deleteAndGetOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"firstName" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed name query query - returns an error', () => {
        req.query.street = 'testStreet';
        req.query.userName = 'testUserName';
        deleteAndGetOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"name" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed postalCode query - returns an error', () => {
        req.query.name = 'testName';
        req.query.firstName = 'testFirstName';
        deleteAndGetOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"userName" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('return Generic error message when details[0] path is not exist', () => {
        const validateStub = sandbox.stub();
        const schemaStub = {
            validate: validateStub,
        };
        sandbox.stub(Joi, 'object').returns(schemaStub);
        schemaStub.validate.returns({ error: { details: undefined } });
        deleteAndGetOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', 'Generic error message'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Call next() when inputs are all valid - Success', () => {
        req.query.name = 'testName';
        req.query.firstName = 'testFirstName';
        req.query.userName = 'testUserName';
        deleteAndGetOneValidation(req, res, next);
        sinon.assert.calledOnce(next);
    });
});
