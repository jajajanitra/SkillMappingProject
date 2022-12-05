import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL } from "../constants";

import SideBar from "../components/SideBar";

function StuCareers () {
    const [careers, setCareers] = useState([]);

    const requestCareers = axios.get(Server_URL+"/career");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestCareers])
        .then(
            axios.spread((...responses) => {
                const resCareers = responses[0];
                setCareers(resCareers.data);
                
            }
            
        ))
        console.log(careers);
    };

    return (
        <div>
            <SideBar></SideBar>
        </div>
    )
}

export default StuCareers;