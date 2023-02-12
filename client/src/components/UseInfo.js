import { useState } from 'react';
import { useCookies } from 'react-cookie';

export default function useToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const getStuName = () => {
        return cookies.stuName;
    };

    const getStuEmail = () => {
        return cookies.stuEmail;
    };

    const [stuName, setStuName] = useState(getStuName());
    const [stuEmail, setStuEmail] = useState(getStuEmail());

    const saveStuName = name => {
        setCookie('stuName', name, {maxAge: 7200, path: '/'});
    };

    const saveStuEmail = email => {
        setCookie('stuEmail', email, {maxAge: 7200, path: '/'});
    };

    const removeStuName = () => {
        removeCookie('stuName', {path:'/'});
        getStuName();
    };

    const removeStuEmail = () => {
        removeCookie('stuEmail', {path:'/'});
        getStuEmail();
    };

    return {
        stuName: getStuName(),
        stuEmail: getStuEmail(),
        setStuName: saveStuName,
        setStuEmail: saveStuEmail,
        removeStuName: removeStuName,
        removeStuEmail: removeStuEmail
    }
    //   JSON.parse(localStorage.getItem('token'))
}