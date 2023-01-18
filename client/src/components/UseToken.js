import { useState } from 'react';

export default function useToken() {
    
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken?.token);
    };

    const removeToken = () => {
        localStorage.removeItem("token");
        getToken();
    };

    const isAuthen = () => {
        return localStorage.getItem('token') != null
    }

    return {
        setToken: saveToken,
        removeToken: removeToken,
        isAuthen: isAuthen(),
        token: getToken()
    }
    //   JSON.parse(localStorage.getItem('token'))
}