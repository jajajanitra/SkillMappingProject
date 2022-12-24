import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL } from "../constants";

import NavBar from "../components/NavBar";


function StuCareerInfo (){
    const [career, setCareer] = useState([]);

    const id = window.location.pathname.split("/").pop()
    const requestCareer = axios.get(Server_URL+"/career/"+id);
    const stuToken = '12345';

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestCareer])
        .then(
            axios.spread((...responses) => {
                const resCareer = responses[0];
                setCareer(resCareer.data);
            }
            
        ))
        console.log(career);
    };
     
    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                {/* <a className="" href="/student_careers">ข้อมูลอาชีพ</a> */}
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div>
                        <h4 className="page-header">{career.name_career}</h4>
                        <div>
                        <h6 className="mt-4 text-m border-l-4 border-pink-700 px-2">ภาระหน้าที่ของอาชีพ</h6>
                            &nbsp; &nbsp; {career.des_thai}
                        </div> 
                        <div>
                            <h6 className="mt-4 text-m border-l-4 border-pink-700 px-2">รายวิชาที่แนะนำ</h6>
                        </div>   
                    </div>

                    <div className="md:mt-8">
                        <h6 className="mt-4 text-m border-l-4 border-pink-700 px-2">ทักษะที่จำเป็นสำหรับอาชีพ</h6>

                        <table class="w-full text-left my-3">
                            <thead className="border-b bg-purple-100">
                                <tr>
                                    <th className="text-sm font-medium px-4 py-4">ทักษะ</th>
                                    <th className="text-sm font-medium px-4 py-4 text-center">ระดับทักษะ</th>
                                </tr>
                            </thead>
                        
                            {career.skills?.map((skill, index) => (
                                <tr className="bg-white border-b ">
                                    <td className="text-sm text-gray-900 font-light px-4 py-4 ">{skill.skill_name}</td>
                                    <td className="text-sm text-gray-900 font-light px-4 py-4 text-center">{skill.level_id}</td>
                                </tr>

                            ))}
                        </table>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default StuCareerInfo;