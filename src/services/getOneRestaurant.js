import { getOneRecord } from '../db/getOneRecord';
import { createRestaurantPK } from '../libs/createRestaurantPK';

export const getOneRestaurant = async (req, res, next) => {
    const { name, street, postalCode } = req.query;
    const pk = createRestaurantPK(name, street, postalCode);
    try {
        const result = await getOneRecord(pk, name);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
