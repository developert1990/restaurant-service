import { COOKIE_EXP, COOKIE_NAME, DOMAIN } from '../constants';
import { IS_PROD } from '../utils';

export const getCookieDomain = () => IS_PROD ? DOMAIN.PROD : DOMAIN.DEV;

export const setCookie = (cookieData, cookieName, cookieExp, httpOnly, res) => {
    res.cookie(cookieName, cookieData, {
        maxAge: 1000 * 60 * cookieExp, httpOnly, // 5 분
        domain: getCookieDomain(),
    });
};

export const removeCookie = (cookieName, res) => {
    res.clearCookie(cookieName);
};
