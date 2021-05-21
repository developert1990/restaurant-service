import { UPDATE_SUCCESS } from '../constants/messages';
import { updateOneRecord } from '../db/updateOneRecord';

export const updateRestaurant = async (req, res, next) => {
    const { name, phoneNum, address, firstName, userName } = req.body;
    try {
        await updateOneRecord({ name, phoneNum, address, firstName, userName });
        res.json(UPDATE_SUCCESS);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
