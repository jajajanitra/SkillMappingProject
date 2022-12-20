import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL } from "../constants";

import SideBar from "../components/SideBar";

function StuCareers () {
    const [careers, setCareers] = useState([]);
    const [searchInput, setSearchInput] = useState("");

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

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const searchCareer = () => {

    };

    return (
        <div className="flex">
            <SideBar></SideBar>
            <div className="w-full p-4">
                <h4>ข้อมูลอาชีพ</h4>
                <div className="grid grid-flow-row-dense grid-cols-6 gap-4">
                    <input
                    className="h-10 w-full p-2 ml-3 mr-3 col-span-5"
                    type="ืีnumber"
                    placeholder="ค้นหาโดยชื่ออาชีพ"
                    onChange={handleSearchChange}
                    value={searchInput} />

                    <button 
                    className="blue-btn"
                    onClick={searchCareer}
                    >ค้นหา</button>
                </div>

                <div class="grid grid-cols-2 gap-6 p-4">
                    {careers.map((career, index) => (
                        <div class="flex justify-center my-4">
                            <div class="block px-6 py-2 rounded-lg shadow-md bg-white hover:bg-sky-700 w-full min-w-fit border-solid border-b-8 border-light-purple">
                                <p class="text-gray-700 text-xl leading-tight font-medium my-1" >{career.name_career}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default StuCareers;