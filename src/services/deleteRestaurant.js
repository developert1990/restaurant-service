import { DELETE_SUCCESS } from '../constants/messages';
import { deleteOneRecord } from '../db';
import { createRestaurantPK } from '../libs/createRestaurantPK';

export const deleteRestaurant = async (req, res, next) => {
    const { name, firstName, userName } = req.query;
    const id = createRestaurantPK({ firstName, userName });
    try {
        await deleteOneRecord({ id, name });
        res.json(DELETE_SUCCESS);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
