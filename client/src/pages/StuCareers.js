import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL } from "../constants";

import NavBar from "../components/NavBar";

function StuCareers () {
    const [careers, setCareers] = useState([]);
    const [results, setResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const requestCareers = axios.get(Server_URL+"/career/");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestCareers])
        .then(
            axios.spread((...responses) => {
                const resCareers = responses[0];
                setCareers(resCareers.data);
                setResults(resCareers.data);
            }
            
        ))
        console.log(careers);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value.toLowerCase());
        
    };

    const searchCareer = () => {
        setResults(careers.filter((career) => {
            //if no input the return the original
            if (searchInput === '') {
                return career;
            }
            //return the item which contains the user input
            else {
                return career.name_career.toLowerCase().includes(searchInput)
            }
        }))
    };

    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header">ข้อมูลอาชีพ</h4>
                <div className="flex flex-wrap lg:grid lg:grid-flow-row-dense lg:grid-cols-6 lg:gap-4 mb-2">
                    <input
                    className="h-10 w-full p-2 mx-2 my-2 md:my-1 lg:col-span-5"
                    type="ืีnumber"
                    placeholder="ค้นหาโดยชื่ออาชีพ"
                    onChange={handleSearchChange}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                          searchCareer()
                        }
                      }} />

                    <button 
                    className="w-full my-1 mx-2 blue-btn"
                    onClick={searchCareer}
                    >ค้นหา</button>
                </div>

                <div>
                    <h5 className="sub-header border-b-2 lg:mb-4">อาชีพทั้งหมด</h5>
                </div>

                <div class="flex flex-wrap md:grid md:grid-cols-2 md:gap-6 p-2 ">
                    {results?.map((career, index) => (
                        <a class="career-card" href={"/student_careers/"+career._id} >{career.name_career}</a>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default StuCareers;