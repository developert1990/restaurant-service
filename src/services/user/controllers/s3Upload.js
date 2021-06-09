const { initialAWS } = require('../../../config/awsConfig');

exports.handler = async function (event, context, callback) {
    initialAWS();

    console.log('event :>> ', event);
};