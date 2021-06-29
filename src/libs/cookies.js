import { COOKIE_NAME, DOMAIN } from '../constants';
import { IS_PROD } from '../utils';

export const getCookieDomain = () => IS_PROD ? DOMAIN.PROD : DOMAIN.DEV;

export const setCookie = ({ token, refreshToken }, res) => {
    res.cookie(COOKIE_NAME.RESTAURANT_COOKIE, token, {
        maxAge: 1000 * 60 * 1, httpOnly: true, // 5 분
        domain: getCookieDomain(),
    });
    res.cookie(COOKIE_NAME.RESTAURANT_COOKIE_REFRESH, refreshToken, {
        maxAge: 1000 * 60 * 2, httpOnly: true, // 30 분
        domain: getCookieDomain(),
    });
};
