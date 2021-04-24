import { DELETE_SUCCESS } from '../constants/messages';
import { deleteOneRecord } from '../db';
import { createRestaurantPK } from '../libs/createRestaurantPK';

export const deleteRestaurant = async (req, res, next) => {
    const { name, street, postalCode } = req.query;
    const pk = createRestaurantPK(name, street, postalCode);
    try {
        await deleteOneRecord(pk, name);
        res.json(DELETE_SUCCESS);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
