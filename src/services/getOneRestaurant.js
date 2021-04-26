import { getOneRecord } from '../db/getOneRecord';
import { createRestaurantID, createRestaurantPK } from '../libs';

export const getOneRestaurant = async (req, res, next) => {
    const { name, postalCode, firstName, userName } = req.query;
    const ownerId = createRestaurantPK({ firstName, userName });
    const id = createRestaurantID({ name, postalCode });
    try {
        const result = await getOneRecord({ ownerId, id });
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
