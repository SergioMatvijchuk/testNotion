import Cookies from 'js-cookie';

export const getUsersFromCookies = () => {
    return Cookies.get('user') || null;
}



/**делаем куки на 10 минут */
export const setUserToCookie = (user) => {
    const tenMinutes = new Date();
    
    console.log("setUserToCookie" , user);
    
    tenMinutes.setMinutes(tenMinutes.getMinutes() + 1000);
    Cookies.set('user', JSON.stringify(user), { expires: tenMinutes, path: '/' });
}

export const setTokenToCookie = (token) => {
    
    const tenMinutes = new Date();
    tenMinutes.setMinutes(tenMinutes.getMinutes() + 1000);
    Cookies.set('token', JSON.stringify(token), { expires: tenMinutes, path: '/' });
    
}
export const getTokenFromUser = () => {
    if (Cookies.get('token'))
        return Cookies.get('token').slice(1, -1) || null;
    return null;
}

