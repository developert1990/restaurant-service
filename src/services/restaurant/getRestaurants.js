import { getAllRecords } from '../../db/restaurant';
import { createRestaurantID } from '../../libs';

export const getRestaurants = async (req, res, next) => {
    const { name, postalCode } = req.query;
    const id = createRestaurantID({ name, postalCode });
    try {
        const results = await getAllRecords(id);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
