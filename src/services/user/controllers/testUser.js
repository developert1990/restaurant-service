const { initialAWS } = require('../../../config/awsConfig');

exports.handler = async function (event, context, callback) {
    initialAWS();

    console.log('event :>> ', event);
};

// const initialAWS = require('../../../config/awsConfig');
// const sqs_user = require('../../sqs');

// exports.handler = async (req, res, next) => {
//     const { username, email, firstName, lastName } = req.body;
//     console.log('req.body :>> ', req.body);
//     initialAWS();
//     try {
//         await sqs_user.sendUserDataToQueue(process.env.QUEUE_URL, { username, email, firstName, lastName });
//         res.send('User data sent');
//     } catch (error) {
//         next(new Error(`SQS error - ${error.message}`));
//     }
// };
