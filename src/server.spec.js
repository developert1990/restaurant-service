import sinon from 'sinon';
import { server } from './server';
import request from 'supertest';
import { expect } from 'chai';

describe('Server - INTEGRATION TEST', () => {

    afterEach(() => {
        server.close();
    });

    it('/api/test - Should returns 200 with success message', (done) => {
        const data = { message: 'Success!!' };
        request(server).get('/api/test').send(data).expect((res) => {
            expect(res.body).to.deep.equal('Success!!');
        }).expect(200, done);
    });
    it('/api/test - Should returns 500 with error message', (done) => {
        request(server).get('/api/test').expect((res) => {
            expect(res.body).to.deep.equal({ message: 'Got an error' });
        }).expect(500, done);
    });
});
