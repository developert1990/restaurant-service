import { getAllRecords } from '../db';

export const queryRestaurants = async (req, res, next) => {
    const { name } = req.query;
    try {
        const results = await getAllRecords(name);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
