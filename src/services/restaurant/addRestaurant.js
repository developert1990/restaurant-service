import { ADD_SUCCESS } from '../../constants';
import { addOneRecord } from '../../db/restaurant';

export const addRestaurant = async (req, res, next) => {
    const { name, phoneNum, address, firstName, userName } = req.body;

    try {
        await addOneRecord({ name, phoneNum, address, firstName, userName });
        res.json(ADD_SUCCESS);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
