export const INVALID_BODY = 'name, phoneNum and address are required';
export const DELETE_SUCCESS = 'Deleted successfully';
export const DELETE_FAIL = 'There is no item to Delete';
export const ADD_SUCCESS = 'Recorded successfully';
export const UPDATE_SUCCESS = 'Updated successfully';

export const COOKIE_NAME = {
    RESTAURANT_COOKIE: 'restaurant_token',
    RESTAURANT_COOKIE_REFRESH: 'restaurant_refresh_token',
    RESTAURANT_USER: 'restaurant_user',
};

export const COOKIE_EXP = {
    REGULAR_TOKEN_EXP: '30m', // 5분
    REGULAR_COOKIE_EXP: 30,
    // REFRESH_TOKEN_EXP: 1000 * 60 * 60 * 2, // 2시간
    REFRESH_TOKEN_EXP: '50m', // 30분
    REFRESH_COOKIE_EXP: 50,
};

export const DOMAIN = {
    // PROD: 'ec2-3-80-79-7.compute-1.amazonaws.com',
    // DEV: "localhost",
    PROD: process.env.COOKIE_DOMAIN_PROD,  // 여기서 도메인은 EC2의 Public IPv4 DNS 값이다.(ex => ec2-3-80-79-7.compute-1.amazonaws.com)
    DEV: 'localhost',
};
