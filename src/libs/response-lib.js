function buildResponse(statusCode, body, res) {
    if (statusCode === 200) {
        const obj = {
            statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS 
            },
            body,
        };
        res.json(obj);
    } else {
        res.status(statusCode).send(body);
    }
}

export function success(body, res) { return buildResponse(200, body, res); };
export function failure(body, res) { return buildResponse(409, body, res); };
