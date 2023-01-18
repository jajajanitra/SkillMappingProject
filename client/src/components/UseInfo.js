import { useState } from 'react';

export default function useToken() {
    
    const getStuName = () => {
        const tokenString = localStorage.getItem('stuName');
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const getStuEmail = () => {
        const tokenString = localStorage.getItem('stuEmail');
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const [stuName, setStuName] = useState(getStuName());
    const [stuEmail, setStuEmail] = useState(getStuEmail());

    const saveStuName = userToken => {
        localStorage.setItem('stuName', JSON.stringify(userToken));
        setStuName(userToken?.stuName);
    };

    const saveStuEmail = userToken => {
        localStorage.setItem('stuEmail', JSON.stringify(userToken));
        setStuEmail(userToken?.stuEmail);
    };

    const removeStuName = () => {
        localStorage.removeItem("stuName");
        getStuName();
    };

    const removeStuEmail = () => {
        localStorage.removeItem("stuEmail");
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