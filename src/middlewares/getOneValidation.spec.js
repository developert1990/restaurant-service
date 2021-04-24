import sinon from 'sinon';
import { getOneValidation } from './getOneValidation';

describe('middlewares - getOneValidation()', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next;
    beforeEach(() => {
        req = {
            query: {
                name: undefined,
                street: undefined,
                postalCode: undefined,
            },
        };
        next = sandbox.stub();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('Missed street query - returns an error', () => {
        req.query.name = 'testName';
        req.query.postalCode = 'testPostalCode';
        getOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"street" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed name query query - returns an error', () => {
        req.query.street = 'testStreet';
        req.query.postalCode = 'testPostalCode';
        getOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"name" is required'));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed postalCode query - returns an error', () => {
        req.query.name = 'testName';
        req.query.street = 'testStreet';
        getOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', '"postalCode" is required'));
        sinon.assert.calledWith(next, expectedError);
    });

    it('Call next() when inputs are all valid - Success', () => {
        req.query.name = 'testName';
        req.query.street = 'testStreet';
        req.query.postalCode = 'testPostalCode';
        getOneValidation(req, res, next);
        sinon.assert.calledOnce(next);
    });
});
