import { DELETE_SUCCESS, DELETE_FAIL } from '../../constants/messages';
import { deleteOneRecord } from '../../db/restaurant';
import { createRestaurantID } from '../../libs';
import { createRestaurantSK } from '../../libs/createRestaurantSK';

export const deleteRestaurant = async (req, res, next) => {
    const { name, postalCode, firstName, userName } = req.query;
    const ownerId = createRestaurantSK({ firstName, userName });
    const id = createRestaurantID({ name, postalCode });
    try {
        const result = await deleteOneRecord({ ownerId, id });
        const returnValLength = Object.keys(result).length;
        if (returnValLength > 0) {
            res.json(DELETE_SUCCESS);
        } else {
            res.json(DELETE_FAIL);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
