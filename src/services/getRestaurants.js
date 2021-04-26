import { getAllRecords } from '../db';
import { createRestaurantPK } from '../libs/createRestaurantPK';

export const getRestaurants = async (req, res, next) => {
    const { firstName, userName } = req.query;
    const id = createRestaurantPK({ firstName, userName });
    try {
        const results = await getAllRecords(id);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
