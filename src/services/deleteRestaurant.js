import { DELETE_SUCCESS } from '../constants/messages';
import { deleteOneRecord } from '../db';
import { createRestaurantID } from '../libs';
import { createRestaurantSK } from '../libs/createRestaurantSK';

export const deleteRestaurant = async (req, res, next) => {
    const { name, postalCode, firstName, userName } = req.query;
    const ownerId = createRestaurantSK({ firstName, userName });
    const id = createRestaurantID({ name, postalCode });
    try {
        await deleteOneRecord({ ownerId, id });
        res.json(DELETE_SUCCESS);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
