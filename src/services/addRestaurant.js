import { ADD_SUCCESS } from '../constants/messages';
import { addOneRecord } from '../db';

export const addRestaurant = async (req, res, next) => {
    const { name, phoneNum, address } = req.body;

    try {
        await addOneRecord(name, phoneNum, address);
        res.json(ADD_SUCCESS);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
