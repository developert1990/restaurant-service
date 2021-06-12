import sinon from 'sinon';
import { putValidation } from './putValidation';
import { INVALID_BODY } from '../../constants/messages';

const testParams = {
    name: 'sangmean',
    phoneNum: 7777,
    address: { City: 'Calgary', Country: 'Canada', street: '57Ave', postalCode: 'T2H' },
};

describe('middlewares - putValidation()', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next;
    beforeEach(() => {
        next = sandbox.stub();
        req = {
            body: {
                name: null,
                phoneNum: null,
                address: null,
            },
        };

    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Missed "name" in body - returns error', () => {
        req.body.phoneNum = testParams.phoneNum;
        req.body.address = testParams.address;
        putValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', INVALID_BODY));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed "phoneNum" in body - reutrns error', () => {
        req.body.name = testParams.name;
        req.body.address = testParams.address;
        putValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', INVALID_BODY));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Missed "address" in body - returns error', () => {
        req.body.name = testParams.name;
        req.body.phoneNum = testParams.phoneNum;
        putValidation(req, res, next);
        const expectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', INVALID_BODY));
        sinon.assert.calledWith(next, expectedError);
    });
    it('Call next() when inputs are all valid - Success', () => {
        req.body.name = testParams.name;
        req.body.phoneNum = testParams.phoneNum;
        req.body.address = testParams.address;
        putValidation(req, res, next);
        sinon.assert.calledOnce(next);
    });
});
