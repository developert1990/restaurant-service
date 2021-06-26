import { COOKIE_NAME } from '../constants/messages';

function buildResponse(statusCode, body, token, refreshToken) {
    if (token) {
        return {
            statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(body),
        };

    } else {
        return {
            statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS 
            },
            body: JSON.stringify(body),
        };
    }
}

export function success(body, token, refreshToken) { return buildResponse(200, body, token, refreshToken); };
export function failure(body) { return buildResponse(409, body); };
