import { useState } from 'react';
import { useCookies } from 'react-cookie';

export default function useToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const getToken = () => {
        return cookies.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        setCookie('token', userToken, {maxAge: 7200, path: '/'});
    };

    const removeToken = () => {
        removeCookie('token',{path:'/'});
        getToken();
    };

    const isAuthen = () => {
        return cookies.token != null
    }

    return {
        setToken: saveToken,
        removeToken: removeToken,
        isAuthen: isAuthen(),
        token: getToken()
    }
    //   JSON.parse(localStorage.getItem('token'))
}