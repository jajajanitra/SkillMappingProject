import axios, { AxiosError } from "axios";
import {Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import useToken from '../components/UseToken';
import useInfo from '../components/UseInfo';

import { Server_URL } from "../constants";

export default function CMUOAuthCallback() {
    const url = window.location.search;
    const code  = new URLSearchParams(url).get("code");
    const [message, setMessage] = useState("");
    const { setToken, isAuthen} = useToken();
    const { setStuName, setStuEmail, } = useInfo();

    const Login_URL = Server_URL+"/login/";    

    useEffect(() => {
    //Next.js takes sometime to read parameter from URL
    //So we'll check if "code" is ready before calling sign-in api
    if (!code) return;
        getAccessToken();
    
    }, [code]);

    const getAccessToken = async () => {
        await axios.post(Login_URL, { authorizationCode: code })
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                console.log("201", res.data);
                setToken(res.data.studentId);
                setStuName(res.data.student_name);
                setStuEmail(res.data.cmuAccount);
                window.location.reload();
            }
        })
        .catch((error) => {
            if (!error.response) {
            setMessage(
                "Cannot connect to CMU OAuth Server. Please try again later."
            );
            } else if (!error.response.data.ok) {
            setMessage(error.response.data.message);
            console.log(message);
            } else {
            setMessage("Unknown error occurred. Please try again later.");
            }
        });
    };

    if(isAuthen) {
        return <Navigate replace to="/student_home" />;
    }else{
        return <div className="p-3">{ "Redirecting ..." || message}</div>;  
    }

//   return <div className="p-3">{message || "Redirecting ..."}</div>;  
  
}
