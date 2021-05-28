import { initialAWS } from '../../config/awsConfig.js';
exports.handler = async function (event, context, callback) {
    initialAWS();

    console.log('event :>> ', event);
};
