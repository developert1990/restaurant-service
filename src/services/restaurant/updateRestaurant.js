import { UPDATE_SUCCESS, ADD_SUCCESS } from '../../constants/messages';
import { updateOneRecord } from '../../db/restaurant';

export const updateRestaurant = async (req, res, next) => {
    const { name, phoneNum, address, firstName, userName } = req.body;
    try {
        const result = await updateOneRecord({ name, phoneNum, address, firstName, userName });
        const resultValLength = Object.keys(result).length;
        if (resultValLength > 0) {
            res.json(UPDATE_SUCCESS);
        } else {
            res.json(ADD_SUCCESS);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
