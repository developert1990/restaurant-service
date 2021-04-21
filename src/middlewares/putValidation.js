
export const putValidation = (req, res, next) => {
    const { name, phoneNum, address } = req.body;
    if (!name || !phoneNum || !Object.keys(address).length === 6) {
        next(new Error('Got an error'));
    } else {
        next();
    }
};
