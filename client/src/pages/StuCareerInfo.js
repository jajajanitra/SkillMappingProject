import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL } from "../constants";

import NavBar from "../components/NavBar";
import useToken from '../components/UseToken';
import {HiOutlineArrowRight, HiOutlineExternalLink, HiOutlineInformationCircle} from 'react-icons/hi';
import {MdOutlineArrowBackIos} from 'react-icons/md';


import Chart from "chart.js/auto";
import { Radar } from 'react-chartjs-2';


function StuCareerInfo (){
    const [career, setCareer] = useState([]);
    const [courses, setCourses] = useState([]);
    const [chartData, setChartData] = useState([]);
    const { token} = useToken();

    const stuToken = token;
    const id = window.location.pathname.split("/").pop()
    const requestCareer = axios.get(Server_URL+"/career/"+stuToken+"/"+id);
    const courseSearch_URL = "https://www1.reg.cmu.ac.th/registrationoffice/searchcourse.php";

    const d = new Date();
    let month = d.getMonth();
    let year = d.getUTCFullYear() + 543;
    let semester = 1;
    if (month > 9 || month < 4 ){
        semester = 2;
    }
    if(month < 5){
        year -= 1;
    }
    

    const data = {
        labels: chartData[0],
        datasets: [
          {
            label: 'ทักษะของคุณจากวิชาที่เรียน',
            data: chartData[1],
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            borderColor: 'rgba(56, 189, 248, 1)',
            borderWidth: 1,
          },
          {
            label: 'ทักษะของคุณจากการประเมินตนเอง',
            data: chartData[2],
            backgroundColor: 'rgb(219, 39, 119, 0.2)',
            borderColor: 'rgb(219, 39, 119, 1)',
            borderWidth: 1,
          },
          {
            label: 'ทักษะที่อาชีพต้องการ',
            data: chartData[3],
            backgroundColor: 'rgba(253, 205, 0, 0.2)',
            borderColor: 'rgba(253, 205, 0, 1)',
            borderWidth: 1,
          },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);
                        if(size > 18){
                            size = 18
                        }
                        return {
                            size: size
                        };
                    }
                }
            },
            
        },
        scale: {
            ticks: {
                min: 0,
                max: 5,
                stepSize: 1
            }
        },
        scales: {
            r: {
              pointLabels: {
                font: function(context) {
                    var width = context.chart.width;
                    var size = Math.round(width / 48);
                    if(size > 18){
                        size = 18
                    }
                    return {
                        size: size
                    };
                }
              }
            }
          }
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestCareer])
        .then(
            axios.spread((...responses) => {
                const resCareer = responses[0];
                setCareer(resCareer.data.career[0]);
                setChartData(resCareer.data.chart);
                setCourses(resCareer.data.courses.sort(
                    (p1, p2) => (p1.id > p2.id) ? 1 : (p1.id < p2.id) ? -1 : 0));
                // console.log(resCareer.data);
            }
            
        ))
        // console.log(career);
    };

    const goBack = () => {
        window.history.back();
    };
     
    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <div className="flex ">
                    <h4 className="h-8 w-8 mt-1 cursor-pointer hover:text-sky-500" onClick={goBack}> <MdOutlineArrowBackIos></MdOutlineArrowBackIos> </h4>
                    <h4 className="page-header">{career.name_career}</h4>    
                </div>
                
                {/* <a className="" href="/student_careers">ข้อมูลอาชีพ</a> */}
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div>
                        <div className="info-card">
                        <h6 className="card-header px-2">ภาระหน้าที่ของอาชีพ</h6>
                        <p className="p-2 text-lg">&nbsp; &nbsp; {career.des_thai}</p>
                        </div> 
                        <div className="info-card mt-4 mb-4">
                            <h6 className="card-header px-2">รายวิชาที่แนะนำ</h6>
                                <p className="p-2 mb-1">&nbsp; &nbsp; คลิกที่ชื่อวิชาเพื่อดูรายละเอียดกระบวนวิชาจาก CMU MIS</p>
                            {courses.length > 0 ? 
                                    <table className="mb-3 w-full">
                                    <tbody>
                                        {courses.map((course, index) => (
                                        
                                            <tr className="course-link" onClick={() => window.open(`https://mis.cmu.ac.th/tqf/coursepublic.aspx?courseno=${course.id}&semester=${semester}&year=${year}`, '_blank')}>
                                                
                                                <td className="md:text-lg pl-4 pr-2">{course.id}</td>
                                                <td className="md:text-lg"> {course.name}</td> 
                                                <td className="px-2"><HiOutlineArrowRight className="text-fuchsia-500 "></HiOutlineArrowRight></td>
                                            </tr>    
                                            
                                        ))}    
                                    </tbody>
                                </table>
                            :
                                <p className="text-center text-red-600">ไม่มีรายวิชาที่แนะนำ เนื่องจากทักษะถึงระดับที่ต้องการแล้ว</p>
                            }
                            

                            <a className="flex justfy-items-center" href={courseSearch_URL} target="_blank"><HiOutlineExternalLink className="h-6 w-6 mx-2"></HiOutlineExternalLink>ค้นหากระบวนวิชาที่เปิดสอน (REG CMU)</a>
                        </div>   
                    </div>

                    <div className="info-card">
                        <h6 className="card-header px-2">ทักษะที่จำเป็นสำหรับอาชีพ</h6>

                        <table class="w-full text-left my-3">
                            <thead className="border-b bg-purple-100">
                                <tr>
                                    <th className="skill-data border-r">ทักษะ</th>
                                    <th className="skill-data text-center">ระดับทักษะ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {career.skills?.map((skill, index) => (
                                    <tr className="bg-white border-b ">
                                        <td className="group skill-data flex border-r">
                                            <p className="text-sky-500 mr-2">
                                                 <HiOutlineInformationCircle className="h-6 w-6"></HiOutlineInformationCircle> 
                                            </p>
                                            <div class="des-block group-hover:block">
                                                 {skill.des_thai}
                                            </div>
                                            {skill.skill_name}
                                        </td>
                                        
                                        <td className="group skill-data text-center text-sky-500">
                                            <div class="des-block group-hover:block right-0 md:right-3 lg:right-4 max-w-sm ml-1">
                                                {skill.thai_level}
                                            </div>
                                            {skill.level_id}
                                        </td>
                                    </tr>

                                ))}    
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="info-card my-4 p-4 text-black ">
                    <h6 className="my-1 text-xl border-l-4 border-pink-700 px-2">เปรียบเทียบทักษะ</h6>
                    <div className="grid cols-1 ">
                        <div className="flex justify-center">
                            <h5 className="w-fit my-3 text-gray-600">กราฟเปรียบเทียบทักษะอาชีพ {career.name_career}</h5>
                        </div>
                    </div>
                    <div className="flex justify-center p-2 max-h-[60rem]">
                        <Radar options={options} data={data} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StuCareerInfo;