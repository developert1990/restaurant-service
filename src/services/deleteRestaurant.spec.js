import sinon from 'sinon';
import { deleteRestaurant } from './deleteRestaurant';
import * as db_deleteOneRecord from '../db/deleteOneRecord';
import * as createFakePK from '../libs/createRestaurantPK';

describe('Services - deleteRestaurant', () => {
    const sandbox = sinon.createSandbox();
    let req, res, next, jsonStub, sendStub, deleteOneRecordStub;
    beforeEach(() => {

    });
    afterEach(() => {
        sandbox.restore();
    });
});
