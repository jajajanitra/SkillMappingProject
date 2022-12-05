import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL, Skill_URL, Course_URL } from "../constants";

import SideBar from "../components/SideBar";

function StuFillInformation () {
    const [skills, setSkills] = useState([]);
    const [opens, setOpens] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const requestSkills = axios.get(Skill_URL);
    const requestCourses = axios.get(Course_URL);

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

                setOpens(new Array(skills.length).fill(false));   
            }
        ))
        
    };

    const handleOpenChange = (event) => {
        var index = event.target.value;
        const toggleOpen = opens.map((o, i) => {
            if (i === index) {
                return !o;
            } else {
                return o;
            }
        });
        setOpens(toggleOpen);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const searchID = () => {
        setFilteredCourses(courses.filter((course) => {
            return course.id === searchInput
        }))
    };

    const addCourse = () => {
        console.log(courses);
    };

    return (
        <div className="flex">
            <SideBar></SideBar>
            <div className="w-full p-3">
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
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent 
                        active
                        " id="tabs-course-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-course" role="tab"
                        aria-controls="tabs-courseJustify" aria-selected="true">รายวิชา</a>
                    </li>
                    <li class="nav-item flex-grow text-center" role="presentation">
                        <a href="#tabs-profileJustify" class="
                        nav-link
                        w-full
                        block
                        font-medium
                        text-xs
                        leading-tight
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100 
                        focus:border-transparent 
                        " id="tabs-skill-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-skill" role="tab"
                        aria-controls="tabs-skillJustify" aria-selected="false">ทักษะ</a>
                    </li>

                    </ul>
                    <div class="tab-content" id="tabs-tabContentJustify">
                        <div class="tab-pane fade show active" id="tabs-course" role="tabpanel"
                            aria-labelledby="tabs-course-tabJustify">
                            <div className="grid grid-flow-row-dense grid-cols-6 gap-4">
                            <input
                            className="h-10 w-full p-2 ml-3 mr-3 col-span-5"
                            type="ืีnumber"
                            placeholder="ค้นหาโดยรหัสวิชา"
                            onChange={handleSearchChange}
                            value={searchInput} />

                            <button 
                            className="blue-btn"
                            onClick={searchID}
                            >ค้นหา</button>
                        </div>
                        
                        <div className="grid mt-3">
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
                                            <td className="text-center p-3"><button className="yellow-btn" onClick={addCourse}>+ เพิ่มรายวิชา</button></td>
                                        </tr>
                                        
                                    ))}    
                                </tbody>

                            </table>                    
                        </div>
                    </div>

                    <div className="tab-pane fade" id="tabs-skill" role="tabpanel" aria-labelledby="tabs-skill-tabJustify">
                        <div class="flex flex-col">
                            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-x-auto">
                                {skills.map((skill, index) => (
                                    <div>
                                        <table class="min-w-full ">
                                        <thead class="border-b bg-gray-100">
                                            <tr>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left w-36">
                                                #
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                ทักษะ
                                            </th>
                                            <th scope="col" colspan="6" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                ระดับ
                                            </th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-b">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <button className="yellow-btn" value={index} onClick={handleOpenChange}>ดูคำอธิบาย</button>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {skill.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap w-24">
                                                    <input type="radio" name={skill.name} id={index} value={0}></input>
                                                    <label>0</label>
                                                </td>
                                            
                                                {skill.levels.map((level) => (
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap w-24">
                                                        <input type="radio" name={skill.name} id={index} value={level.level_id}></input>
                                                        <label>{level.level_id}</label>
                                                    </td>
                                                ))}
                                            </tr>
                                            
                                            
                                        </tbody>
                                        </table>
                                    
                                        <table class={`min-w-full text-left mb-2 ${!opens[index] && "hidden"}`}>
                                            <thead class="border-b bg-gray-100">
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