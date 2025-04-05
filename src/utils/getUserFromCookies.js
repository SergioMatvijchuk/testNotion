import Cookies from 'js-cookie';

export const getUsersFromCookies = () => {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) : null;
}
/**делаем куки на 10 минут */
export const setUserToCookie = (user) => {

    const tenMinutes = new Date();
    tenMinutes.setMinutes(tenMinutes.getMinutes() + 10);
    Cookies.set('user', JSON.stringify(user), { expires: tenMinutes, path: '/' });
}

export const getTokenFromUser = () => {
    const user = getUsersFromCookies();
    return user ? user.token : null;
}

export const updateToken = (newToken) => {
    const user = getUsersFromCookies();
    if (user) {
        user.token = newToken;
        const tenMinutes = new Date();
        tenMinutes.setMinutes(tenMinutes.getMinutes() + 1000);
        Cookies.set('user', JSON.stringify(newToken, { expires: tenMinutes, path: '' }));
    }
}