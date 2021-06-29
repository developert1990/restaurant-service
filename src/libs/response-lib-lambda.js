// function buildResponse(statusCode, body, token, refreshToken) {
//     console.log('token 받아서 제대로 들어옴');
//     if (token) {
//         return {
//             statusCode,
//             headers: {
//                 'Access-Control-Allow-Origin': 'http://localhost:3000', // Required for CORS support to work
//                 'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS ,
//                 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
//                 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//                 'Set-Cookie': 'test=hong',
//             },
//             body: JSON.stringify(body),
//         };
//     } else {
//         return {
//             statusCode,
//             headers: {
//                 'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//                 'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS ,
//                 'Set-Cookie': 'test=hong',
//             },
//             body: JSON.stringify(body),
//         };
//     }
// }

// export function success(body, token, refreshToken) { return buildResponse(200, body, token, refreshToken); };
// export function failure(body) { return buildResponse(409, body); };
