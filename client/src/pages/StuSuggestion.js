import React, { useState, useEffect } from "react";
import axios from "axios";
import { Server_URL } from "../constants";
import {FaRegEdit} from 'react-icons/fa';
import {IoBookOutline} from 'react-icons/io5';


import NavBar from "../components/NavBar";
import useToken from '../components/UseToken';

function StuSuggestion () {
    const [hidden, setHidden] = useState(true);
    const { token} = useToken();
    const [careerByCourses, setCareerByCourses] = useState([]);
    const [careerBySelf, setCareerBySelf] = useState([]);
    const requestSuggestion = axios.get(Server_URL+"/student/mapping/"+token);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestSuggestion])
        .then(
            axios.spread((...responses) => {
                const resSuggestion = responses[0].data;
                setCareerByCourses(resSuggestion.bycourses);
                setCareerBySelf(resSuggestion.byself);
                console.log(careerByCourses);
            }
            
        ))
    };

    const toggleHidden = () => {
        setHidden(!hidden);
    };
    
    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header mb-6">แนะนำอาชีพ</h4>
                <div className="overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-12">
                    <div className="mt-2 mb-8">
                        <h6 className="text-xl pl-2 mb-4 text-center flex justify-center"><span className="px-2 "><IoBookOutline className="h-6 w-6"></IoBookOutline></span><span>อาชีพที่แนะนำจากรายวิชาที่เรียน</span></h6>
                        <div className="px-2">
                            {careerByCourses.length > 0 ? 
                                <div>
                                    {careerByCourses.map((career, index) => (
                                        <a class="career-sugg-card border-blue-700 " href={"/student_careers/"+career._id} >{index+1}. {career.career}</a>
                                    ))} 
                                </div>
                                :
                                <div className="flex justify-center">
                                    <p>กรุณา <a href="/student_fillinformation">กรอกข้อมูล</a> ก่อนใช้งาน</p>
                                </div>}
                               
                        </div>
                    </div>
                    <div className="mt-2 mb-8">
                        <h6 className="text-xl pl-2 mb-4 text-center flex justify-center"><span className="px-2"><FaRegEdit className="h-6 w-6"></FaRegEdit></span><span>อาชีพที่แนะนำจากการประเมินตนเอง</span></h6>
                        <div className="px-2">
                            {careerBySelf.length > 0 ? 
                            <div>
                                {careerBySelf.map((career, index) => (
                                    <a class="career-sugg-card border-orange-500" href={"/student_careers/"+career._id} >{index+1}. {career.career}</a>
                                ))} 
                            </div>
                            :
                            <div className="flex justify-center">
                                <p>กรุณา <a href="/student_fillinformation">กรอกข้อมูล</a> ก่อนใช้งาน</p>
                            </div>}
                               
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-end mb-4">
                        <button className="py-2 px-4 rounded-md text-purple-500 hover:bg-purple-500 hover:text-white" onClick={toggleHidden}>? วิธีการคำนวน</button>
                    </div>
                    {hidden?(
                        <span></span>
                    ):(
                        <div className="info-card block border-2 border-purple-100">
                            <div className="flex justify-end mx-3">
                                <button className="text-red-500 text-lg md:text-3xl" onClick={toggleHidden}>X</button>
                            </div>
                            <h4 className="px-2 text-gray-700">วิธีการคำนวน</h4>
                            <p className="p-2 text-gray-700">&nbsp; &nbsp;ในการแนะนำอาชีพ จะเลือกอาชีพที่มีระยะห่างน้อยที่สุด 5 อาชีพ เพื่อแนะนำให้กับผู้ใช้ โดยในการหาระยะห่างระหว่างผู้ใช้กับอาชีพแต่ละอาชีพนั้น จะใช้สูตร euclidean ในการหาระยะห่าง</p>
                            <img alt="Euclidean Formula" src={require("../images/EuclideanFormula.png")}></img>
                        </div>   
                    )}
                </div>
            </div>
        </div>
    )
}

export default StuSuggestion;