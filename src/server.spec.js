import sinon from 'sinon';
import request from 'supertest';
import { server } from './server';
import * as db_addOneRecord from './db/addOneRecord';
import { expect } from 'chai';
import { ADD_SUCCESS } from './constants/messages';

const testParams = {
    name: 'sangmean',
    phoneNum: 7777,
    address: { City: 'Calgary', Country: 'Canada', street: '57Ave', postalCode: 'T2H' },
};

describe('Server - INTEGRATION TEST', () => {
    const sandbox = sinon.createSandbox();
    afterEach(() => {
        sandbox.restore();
        server.close();
    });
    describe('/api', () => {
        let addOneRecordStub, req;
        beforeEach(() => {
            addOneRecordStub = sandbox.stub(db_addOneRecord, 'addOneRecord');
            req = {
                body: {
                    name: null,
                    phoneNum: null,
                    address: null,
                },
            };
        });
        it('/restaurant - PUT returns 200 with success message', (done) => {
            addOneRecordStub.resolves();
            const data = {
                name: testParams.name,
                phoneNum: testParams.phoneNum,
                address: testParams.address,
            };
            request(server).put('/api/restaurant').send(data).expect((res) => {
                expect(res.body).to.deep.equal(ADD_SUCCESS);
            }).expect(200, done);
        });
        it('restaurant - PUT returns 500 with error message', (done) => {
            addOneRecordStub.throws();
            const data = {
                name: testParams.name,
                phoneNum: testParams.phoneNum,
                address: testParams.address,
            };
            request(server).put('/api/restaurant').send(data).expect((res) => {
                expect(res.error.text).to.equal('Error');
            }).expect(500, done);
        });
    });
});
