
export const test = (req, res, next) => {
    const { message } = req.body;
    if (!message) {
        console.log('message :>> ', message);
        res.status(500).send({ message: 'Got an error' });
    } else {
        res.json(message);

    }
};
