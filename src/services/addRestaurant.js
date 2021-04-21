import { addOneRecord } from '../db';

export const addRestaurant = async (req, res, next) => {
    const { name, phoneNum, address } = req.body;
    try {
        await addOneRecord(name, phoneNum, address);
        res.json({ message: 'Recorded successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
