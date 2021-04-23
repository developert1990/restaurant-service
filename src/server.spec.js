import sinon from 'sinon';
import request from 'supertest';
import { server } from './server';
import * as db_addOneRecord from './db/addOneRecord';
import * as db_getOneRecord from './db/getOneRecord';
import { expect } from 'chai';
import { ADD_SUCCESS } from './constants/messages';

const testParams = {
    name: 'sangmean',
    phoneNum: 7777,
    address: { City: 'Calgary', Country: 'Canada', street: '57Ave', postalCode: 'T2H' },
};

describe('Server - INTEGRATION TEST', () => {
    let addOneRecordStub, getOneRecordStub;
    const sandbox = sinon.createSandbox();
    afterEach(() => {
        sandbox.restore();
        server.close();
    });
    describe('PUT - /api/restaurant', () => {
        beforeEach(() => {
            addOneRecordStub = sandbox.stub(db_addOneRecord, 'addOneRecord');
        });
        it('Returns 200 with success message', (done) => {
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
        it('Returns 500 with error message', (done) => {
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

    describe('GET - /api/restaurant ', () => {

        beforeEach(() => {
            getOneRecordStub = sandbox.stub(db_getOneRecord, 'getOneRecord');
        });
        it('Returns 200 with a restaurant info', (done) => {
            const successResult = {
                name: 'sangmean',
                phoneNum: 7777,
                address: { City: 'Calgary', Country: 'Canada', street: '57Ave', postalCode: 'T2H' },
            };
            getOneRecordStub.resolves(successResult);
            request(server).get('/api/restaurant').query({ name: 'getTest', street: 'getStreet', postalCode: 'getPostalCode' }).expect((res) => {
                expect(res.body).to.deep.equal(successResult);
            }).expect(200, done);
        });
        it('Returns 500 with an error message', (done) => {
            getOneRecordStub.throws();
            request(server).get('/api/restaurant').query({ name: 'getTest', street: 'getStreet' }).expect(500, done);
        });
    });
});
