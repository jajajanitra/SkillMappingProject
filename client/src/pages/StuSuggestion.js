import React, { useState, useEffect } from "react";
import axios from "axios";
import { Server_URL } from "../constants";
import {FaRegEdit} from 'react-icons/fa';
import {IoBookOutline} from 'react-icons/io5';


import NavBar from "../components/NavBar";
import useToken from '../components/UseToken';

function StuSuggestion () {
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
                
            }
            
        ))
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
                            {careerByCourses.map((career, index) => (
                                <a class="career-sugg-card border-blue-700 " href={"/student_careers/"+career._id} >{index+1}. {career.career} (distance: {career.distance})</a>
                            ))}    
                        </div>
                    </div>
                    <div className="mt-2 mb-8">
                        <h6 className="text-xl pl-2 mb-4 text-center flex justify-center"><span className="px-2"><FaRegEdit className="h-6 w-6"></FaRegEdit></span><span>อาชีพที่แนะนำจากการประเมินตนเอง</span></h6>
                        <div className="px-2">
                            {careerBySelf.map((career, index) => (
                                <a class="career-sugg-card border-orange-500" href={"/student_careers/"+career._id} >{index+1}. {career.career} (distance: {career.distance})</a>
                            ))}    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StuSuggestion;