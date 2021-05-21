import sinon from 'sinon';
import { getAllValidation } from './getAllValidation';
import Joi from 'joi';

describe('middlewares - getAllValidation()', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next;
    beforeEach(() => {
        req = {
            query: {
                name: undefined,
                postalCode: undefined,
            },
        };
        next = sandbox.stub();
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Missed name query - return error', () => {
        req.query.postalCode = 'testpostalCode';
        getAllValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"name" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed postalCode query - return error', () => {
        req.query.name = 'testname';
        getAllValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"postalCode" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Return Generic error message when details[0] path is not exist', () => {
        const validateStub = sandbox.stub();
        const schemaStub = {
            validate: validateStub,
        };
        sandbox.stub(Joi, 'object').returns(schemaStub);
        schemaStub.validate.returns({ error: { details: undefined } });
        getAllValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', 'Generic error message'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Call next() when inputs are all valid - success', () => {
        req.query.name = 'testname';
        req.query.postalCode = 'testpostalCode';
        getAllValidation(req, res, next);
        sinon.assert.calledOnce(next);
    });
});
