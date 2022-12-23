import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {AiOutlineInfoCircle} from 'react-icons/ai';

import { Server_URL, Skill_URL, Course_URL } from "../constants";

import NavBar from "../components/NavBar";

const MySwal = withReactContent(Swal);

function StuFillInformation () {
    const [skills, setSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const requestSkills = axios.get(Skill_URL);
    const requestCourses = axios.get(Course_URL);
    const token = "12345";

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestSkills, requestCourses])
        .then(
            axios.spread((...responses) => {
                const resSkills = responses[0];
                setSkills(resSkills.data);
                const resCourses = responses[1];
                setCourses(resCourses.data);

            }
        ))
        // console.log(skills);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const searchID = () => {
        setFilteredCourses(courses.filter((course) => {
            return course.id === searchInput
        }))
    };

    const addCourse = async (event, course) => {
        // console.log(course);
        await axios.post(Server_URL+'/student/courses',{
            token: token,
            course_id: course.id,
            course_name: course.name,
            id: course._id
            
        })
        .then(
            (res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201){
                    MySwal.fire({
                        title: 'เพิ่มรายวิชาเรียบร้อย!',
                        text: '',
                        icon: 'success',
                        confirmButtonColor: '#7FCFFF',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                }else{
                    MySwal.fire({
                        title: 'เกิดข้อผิดพลาด!',
                        text: `Status ${res.status} (${res.statusText})`,
                        icon: 'error',
                        confirmButtonColor: '#7FCFFF',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                }
            }
        )
    };

    const addSelfSkill = async () => {

    };

    const addLike = async () => {

    };


    return (
        <div className="flex">
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header">กรอกข้อมูล</h4>
                <ul class="
                nav nav-tabs nav-justified
                flex flex-col
                md:flex-row
                flex-wrap
                list-none
                border-b-0
                pl-0
                mb-4
                " id="tabs-tabJustify" role="tablist">
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-homeJustify" class="
                    nav-link
                    w-full
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    border-x-0 border-t-0 border-b-2 border-transparent
                    px-6
                    py-3
                    my-2
                    hover:border-transparent hover:bg-gray-100
                    focus:border-transparent
                    active
                    " id="tabs-home-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-homeJustify" role="tab"
                    aria-controls="tabs-homeJustify" aria-selected="true">รายวิชา</a>
                </li>
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-profileJustify" class="
                    nav-link
                    w-full
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    border-x-0 border-t-0 border-b-2 border-transparent
                    px-6
                    py-3
                    my-2
                    hover:border-transparent hover:bg-gray-100
                    focus:border-transparent
                    " id="tabs-profile-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-profileJustify" role="tab"
                    aria-controls="tabs-profileJustify" aria-selected="false">ทักษะ</a>
                </li>
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-messagesJustify" class="
                    nav-link
                    w-full
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    border-x-0 border-t-0 border-b-2 border-transparent
                    px-6
                    py-3
                    my-2
                    hover:border-transparent hover:bg-gray-100
                    focus:border-transparent
                    " id="tabs-messages-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-messagesJustify" role="tab"
                    aria-controls="tabs-messagesJustify" aria-selected="false">ความชอบ</a>
                </li>
                </ul>
                <div class="tab-content" id="tabs-tabContentJustify">
                    <div class="tab-pane fade show active" id="tabs-homeJustify" role="tabpanel"
                    aria-labelledby="tabs-home-tabJustify">
                        <div className="flex flex-wrap lg:grid lg:grid-flow-row-dense lg:grid-cols-6 lg:gap-4">
                            <input
                            className="h-10 w-full p-2 mx-2 my-2 md:my-1 lg:col-span-5"
                            type="ืีnumber"
                            placeholder="ค้นหาโดยรหัสวิชา"
                            onChange={handleSearchChange}
                            value={searchInput} />

                            <button 
                            className="w-full my-1 mx-2 blue-btn"
                            onClick={searchID}
                            >ค้นหา</button>
                        </div>
                        
                        <div className="grid mt-3">
                            {filteredCourses.length > 0 ? (
                                <table className="text-m text-left ml-4 mr-4 mt-3 p-2 ">
                                    <thead className="bg-gray-100 p-2">
                                        <tr>
                                            <th className="text-sm font-medium text-gray-900 p-2">รหัสวิชา</th>
                                            <th className="text-sm font-medium text-gray-900 p-2">ชื่อวิชา</th>
                                            <th className="text-sm font-medium text-gray-900 p-2">หัวข้อ</th>
                                            <th className="text-sm font-medium text-gray-900 text-center w-36">เพิ่ม</th>    
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredCourses.map((course, index) => (
                                            <tr className="border-b hover:bg-gray-50">
                                                <td className="p-3">{course.id}</td>
                                                <td className="p-3">{course.name}</td>
                                                <td className="p-3">{course.sel_topic}</td>
                                                <td className="text-center p-3"><button className="yellow-btn" onClick={event => addCourse(event, course)}>+ เพิ่มรายวิชา</button></td>
                                            </tr>
                                            
                                        ))}    
                                    </tbody>

                                </table>   
                            ):(
                                    <span></span>
                            )}            
                        </div>
                    </div>

                <div class="tab-pane fade" id="tabs-profileJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                    <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-x-auto">
                                {skills.map((skill, index) => (
                                    <div>
                                        <div class="min-w-full ">
                                            <div class="border-double border-l-8 border-pink-600  px-3 py-2 shadow-md">
                                                <span className="flex flex-wrap">
                                                    <button class="accordion-button collapsed relative flex items-center w-fit py-2 lg:px-3 text-base text-gray-800 text-left
                                                    bg-white border-0 rounded-none transition focus:outline-none hover:bg-blue-500" 
                                                    type="button" data-bs-toggle="collapse" 
                                                    data-bs-target={"#"+skill.name.replace(/[^A-Z0-9]+/ig, "_")}
                                                    aria-expanded="false" aria-controls={skill.name.replace(/[^A-Z0-9]+/ig, "_")}>
                                                        <span className="pr-1 text-blue-500 text-lg"><AiOutlineInfoCircle></AiOutlineInfoCircle></span>
                                                        ทักษะ: {skill.name}
                                                    </button>
                                                </span>
                                                <div className="flex justify-between">
                                                    <span className="inline-block align-baseline py-2">ระดับ:</span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name} id={index} value={0}></input>
                                                        <label>0</label>
                                                    </span>
                                                    {skill.levels.map((level) => (
                                                        <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                            <input type="radio" name={skill.name} id={skill._id} value={level.level_id}></input>
                                                            <label>{level.level_id}</label>
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                            </div>

                                        </div>
                                        
                                    
                                        <div class="accordion accordion-flush" id="accordionFlushExample">
                                            <div class="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
                                                <h2 class="accordion-header mb-0" id="flush-headingOne">
                                                </h2>
                                                <div id={skill.name.replace(/[^A-Z0-9]+/ig, "_")} class="accordion-collapse border-0 collapse"
                                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body py-4">
                                                        <table class={`min-w-full text-left`}>
                                                            <thead class="border-b bg-pink-50">
                                                                <tr>
                                                                <th scope="col" class="text-sm font-medium px-6 py-4 w-12">
                                                                    ระดับ
                                                                </th>
                                                                <th scope="col" class="text-sm font-medium px-6 py-4">
                                                                    คำอธิบาย
                                                                </th>
                                                                
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {skill.levels.map((level) => (
                                                                    <tr className="bg-white border-b">
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 w-12 text-center">{level.level_id} </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 ">{level.level_des}</td>
                                                                    </tr>
                                                                ))}
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <br></br>

                                    </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>     
                </div> 
                
                <div class="tab-pane fade" id="tabs-messagesJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                    <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-x-auto">
                                {skills.map((skill, index) => (
                                    <div>
                                        <div class="min-w-full ">
                                            <div class="border-double border-l-8 border-sky-500  px-3 py-2 shadow-md">
                                                <span className="flex flex-wrap">
                                                    <button class="accordion-button collapsed relative flex items-center w-fit py-2 lg:px-3 text-base text-gray-800 text-left
                                                    bg-white border-0 rounded-none transition focus:outline-none " 
                                                    type="button" data-bs-toggle="collapse" 
                                                    data-bs-target={"#"+"l"+skill.name.replace(/[^A-Z0-9]+/ig, "_")}
                                                    aria-expanded="false" aria-controls={"l"+skill.name.replace(/[^A-Z0-9]+/ig, "_")}>
                                                        <span className="pr-1 text-blue-500 text-lg"><AiOutlineInfoCircle></AiOutlineInfoCircle></span>
                                                        ทักษะ: {skill.name}
                                                    </button>
                                                </span>
                                                <div className="flex justify-between">
                                                    <span className="inline-block align-baseline py-2">ความชอบ:</span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name} id={index} value={0}></input>
                                                        <label>0</label>
                                                    </span>
                                                    {skill.levels.map((level) => (
                                                        <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                            <input type="radio" name={skill.name} id={skill._id} value={level.level_id}></input>
                                                            <label>{level.level_id}</label>
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                            </div>

                                        </div>
                                        
                                        <div class="accordion accordion-flush" id="accordionFlushExample">
                                            <div class="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
                                                <h2 class="accordion-header mb-0" id="flush-headingOne">
                                                
                                                </h2>
                                                <div id={"l"+skill.name.replace(/[^A-Z0-9]+/ig, "_")} class="accordion-collapse border-0 collapse"
                                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body py-4">
                                                        <span className="text-md underline underline-offset-4 decoration-sky-500 decoration-2">
                                                                คำอธิบายสำหรับทักษะ {skill.name}
                                                        </span>
                                                        <p className="mt-2">
                                                            {skill.des}   
                                                        </p>
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <br></br>

                                    </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>

            </div>
            
        </div>
    )
}

export default StuFillInformation;