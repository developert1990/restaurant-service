import sinon from 'sinon';
import { getOneValidation, schema } from './getOneValidation';



describe('middlewares - getOneValidation()', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, validatingStub;
    beforeEach(() => {
        validatingStub = sandbox.stub(schema, 'validate');
        req = {
            query: {
                name: null,
                street: null,
                postalCode: null,
            },
        };
        next = sandbox.stub();
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Missed one of data in query - returns an error', () => {
        const validationResult = { error: { details: [{ message: 'Validation Error' }] } };
        validatingStub.returns(validationResult);
        getOneValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', validationResult.error.details[0].message));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Call next() when inputs are all valid - Success', () => {
        const successResult = {
            name: 'sangmean',
            phoneNum: 7777,
            address: { City: 'Calgary', Country: 'Canada', street: '57Ave', postalCode: 'T2H' },
        };
        validatingStub.returns(successResult);
        getOneValidation(req, res, next);
        sinon.assert.calledOnce(next);
    });
});
