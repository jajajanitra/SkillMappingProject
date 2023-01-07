import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {BsEmojiDizzy, BsEmojiAngry, BsEmojiFrown, BsEmojiExpressionless, BsEmojiSmile, BsEmojiLaughing} from 'react-icons/bs';
import {BsClipboard, BsTools, BsBookmarkHeart} from 'react-icons/bs';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {TfiSave} from 'react-icons/tfi';
import {MdAdd} from 'react-icons/md';


import { Server_URL, Skill_URL, Course_URL } from "../constants";

import NavBar from "../components/NavBar";

const MySwal = withReactContent(Swal);

function StuFillInformation () {
    const [skills, setSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selfSkills, setSelfSkills] = useState([]);
    const [likes, setLikes] = useState([]);

    const requestSkills = axios.get(Skill_URL);
    const requestCourses = axios.get(Course_URL);
    const addSkills_URL = Server_URL+"/student/selfs";
    const addLikes_URL = Server_URL+"/student/likes";
    const token = "12345";

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestSkills, requestCourses])
        .then(
            axios.spread((...responses) => {
                const resSkills = responses[0].data;
                const data = [...resSkills]
                setSkills(data);
                setSelfSkills(resSkills);
                setLikes(resSkills);
                const resCourses = responses[1].data;
                setCourses(resCourses);

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
        
        // if(filteredCourses.length < 1){
        //     MySwal.fire({
        //         title: 'ไม่พบข้อมูลรายวิชานี้!',
        //         text: `ไม่มีข้อมูลของรายวิชา ${searchInput}`,
        //         icon: 'error',
        //         confirmButtonColor: '#7FCFFF',
        //         allowOutsideClick: false,
        //         allowEscapeKey: false
        //     })
        // }
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

    const handleSkillsLevelChange = (event) => {
        const name = event.target.name;
        const index = selfSkills.findIndex(object => {
            return object.name === name;
        });
        // const index = event.target
        const level = event.target.value;
        let tempSkill = skills;
        tempSkill[index]['skill_self'] = level;
        setSelfSkills(tempSkill);
    };

    const handleLikesLevelChange = (event) => {
        const name = event.target.name;
        const index = likes.findIndex(object => {
            return object.name === name;
        });
        // const index = event.target
        const level = event.target.value;
        let tempSkill = skills;
        tempSkill[index]['skill_like'] = level;
        setLikes(tempSkill);
    };

    const addSelfSkills = async () => {
        // selfSkills.forEach((skill, index) => {
        //     delete skill['des'];
        //     delete skill['levels'];
        // })
        console.log(selfSkills);

        await axios.post(addSkills_URL,{
            token: token,
            skill: selfSkills
        }).then((res) => {
            console.log(res.status);
            if (res.status === 200 || res.status === 201){
                MySwal.fire({
                    title: 'บันทึกเรียบร้อย!',
                    text: 'ข้อมูลทักษะของคุณถูกบันทึกแล้ว',
                    icon: 'success',
                    confirmButtonColor: '#7FCFFF',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    if (result.isConfirmed){
                    }
                })
            }else{
                MySwal.fire({
                    title: 'มีบางอย่างผิดพลาด!',
                    text: `Status ${res.status} (${res.statusText})`,
                    icon: 'error',
                    confirmButtonColor: '#7FCFFF',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })

    };

    const addLikes = async () => {
        // likes.forEach((skill, index) => {
        //     delete skill['des'];
        //     delete skill['levels'];
        // })
        console.log(likes);

        await axios.post(addLikes_URL,{
            token: token,
            skill: likes
        }).then((res) => {
            console.log(res.status);
            if (res.status === 200 || res.status === 201){
                MySwal.fire({
                    title: 'บันทึกเรียบร้อย!',
                    text: 'ข้อมูลความชอบของคุณถูกบันทึกแล้ว',
                    icon: 'success',
                    confirmButtonColor: '#7FCFFF',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    if (result.isConfirmed){
                    }
                })
            }else{
                MySwal.fire({
                    title: 'มีบางอย่างผิดพลาด!',
                    text: `Status ${res.status} (${res.statusText})`,
                    icon: 'error',
                    confirmButtonColor: '#7FCFFF',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
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
                " id="tabs-tabJustify" role="tablist">
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-homeJustify" class="fillInfo-tab active" 
                    id="tabs-home-tabJustify" 
                    data-bs-toggle="pill" 
                    data-bs-target="#tabs-homeJustify" role="tab"
                    aria-controls="tabs-homeJustify" aria-selected="true"><span className="flex justify-center"><BsClipboard className="h-7 mr-2"></BsClipboard>รายวิชา</span></a>
                </li>
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-profileJustify" class="fillInfo-tab" 
                    id="tabs-profile-tabJustify" 
                    data-bs-toggle="pill" 
                    data-bs-target="#tabs-profileJustify" role="tab"
                    aria-controls="tabs-profileJustify" aria-selected="false"><span className="flex justify-center"><BsTools className="h-7 mr-2"></BsTools>ทักษะ</span></a>
                </li>
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-messagesJustify" class="fillInfo-tab" 
                    id="tabs-messages-tabJustify" 
                    data-bs-toggle="pill" 
                    data-bs-target="#tabs-messagesJustify" role="tab"
                    aria-controls="tabs-messagesJustify" aria-selected="false"><span className="flex justify-center"><BsBookmarkHeart className="h-7 mr-2"></BsBookmarkHeart> ความชอบ</span></a>
                </li>
                </ul>
                <div class="tab-content" id="tabs-tabContentJustify">
                    <div class="tab-pane fade show active" id="tabs-homeJustify" role="tabpanel"
                    aria-labelledby="tabs-home-tabJustify">
                        <div>
                            <h5 className="sub-header">เพิ่มรายวิชาที่เคยเรียน</h5>
                        </div>
                        <div className="flex flex-wrap lg:grid lg:grid-flow-row-dense lg:grid-cols-6 lg:gap-4">
                            <input
                            className="h-10 w-full p-2 mx-2 my-2 md:my-1 lg:col-span-5"
                            type="ืีnumber"
                            placeholder="ค้นหาโดยรหัสวิชา"
                            onChange={handleSearchChange}
                            value={searchInput}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    searchID()
                                }
                              }} />

                            <button 
                            className="w-full my-1 mx-2 blue-btn"
                            onClick={searchID}
                            >ค้นหา</button>
                        </div>
                        
                        <div className="grid mt-3">
                            {filteredCourses.length > 0 ? (
                                <table className="text-m text-left ml-4 mr-4 mt-3 p-2 ">
                                    <thead className="bg-purple-100 p-2">
                                        <tr>
                                            <th className="text-m font-medium text-gray-900 p-2 lg:pl-3">รหัสวิชา</th>
                                            <th className="text-m font-medium text-gray-900 p-2 lg:pl-3">ชื่อวิชา</th>
                                            <th className="text-m font-medium text-gray-900 p-2 lg:pl-3">หัวข้อ</th>
                                            <th className="text-m font-medium text-gray-900 text-center w-36 lg:pl-3">เพิ่ม</th>    
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredCourses.map((course, index) => (
                                            <tr className="border-b bg-white hover:bg-gray-50">
                                                <td className="p-3">{course.id}</td>
                                                <td className="p-3">{course.name}</td>
                                                <td className="p-3">{course.sel_topic}</td>
                                                <td className="text-center p-3">
                                                    <button className="green-btn h-fit flex items-center" onClick={event => addCourse(event, course)}>
                                                        <span className="px-2">
                                                           <MdAdd></MdAdd> 
                                                        </span>
                                                    เพิ่ม</button>
                                                </td>
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
                                <div>
                                    <h5 className="sub-header">ประเมินระดับทักษะด้วยตนเอง</h5>
                                    <p className="px-2">
                                    &nbsp; &nbsp;เลือกระดับทักษะของตนเองในแต่ละทักษะซึ่ง 0 คือไม่มีทักษะ โดยสามารถคลิกที่ชื่อทักษะเพื่อดูคำอธิบายว่าทักษะนี้ในแต่ละระดับจะต้องมีความสามารถทำอะไรได้บ้าง แล้วเลือกระดับที่เหมาะสมกับตนเอง
                                    </p>
                                </div>
                                <div class="overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-6 ">
                                {skills.map((skill, index) => (
                                    <div>
                                        <div class="min-w-full ">
                                            <div class="border-double border-l-8 border-pink-600  px-3 py-2 shadow-md bg-white w-full">
                                                <span className="flex flex-wrap w-full">
                                                    <button class="accordion-button flex justify-between w-full py-2 lg:px-3 text-base text-gray-800
                                                    border-0 transition focus:outline-none hover:bg-pink-50 "
                                                    type="button" data-bs-toggle="collapse" 
                                                    data-bs-target={"#"+skill.name.replace(/[^A-Z0-9]+/ig, "_")}
                                                    aria-expanded="false" aria-controls={skill.name.replace(/[^A-Z0-9]+/ig, "_")}>
                                                        <div className="w-full flex justify-between">
                                                            <span className="">ทักษะ: {skill.name}</span>
                                                            <span className=" pr-2 text-blue-500 text-3xl relative"><RiArrowDropDownLine></RiArrowDropDownLine></span>
                                                        </div>
                                                    </button>
                                                </span>
                                                <div className="flex justify-between">
                                                    <span className="inline-block align-baseline py-2">ระดับ:</span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name} id={skill._id} value={0} onChange={handleSkillsLevelChange}></input>
                                                        <label>0</label>
                                                    </span>
                                                    {skill.levels.map((level) => (
                                                        <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                            <input type="radio" name={skill.name} id={skill._id} value={level.level_id} onChange={handleSkillsLevelChange}></input>
                                                            <label>{level.level_id}</label>
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                            </div>

                                        </div>
                                        
                                    
                                        <div class="accordion accordion-flush" id="accordionFlushExample">
                                            <div class="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
                                                
                                                <div id={skill.name.replace(/[^A-Z0-9]+/ig, "_")} class="accordion-collapse border-0 collapse"
                                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body py-4">
                                                        <h6 class="text-md underline underline-offset-4 decoration-pink-600 decoration-2 mb-3" >
                                                            คำอธิบายความสามารถของทักษะในแต่ละระดับ
                                                        </h6>
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
                        <div className="flex justify-end">
                            <button className="green-btn" onClick={addSelfSkills}>
                                <div className="flex justify-center">
                                    <span className="block px-2 lg:px-1"><TfiSave className="h-6 w-6"></TfiSave></span>
                                    <span className="block px-2 lg:px-1">บันทึกข้อมูล</span>  
                                </div>
                            </button>
                        </div>
                    </div>     
                </div> 
                
                <div class="tab-pane fade" id="tabs-messagesJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                    <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div>
                                    <h5 className="sub-header">ประเมินระดับความชอบรายทักษะ</h5>
                                    <p className="px-2">
                                    &nbsp; &nbsp;เลือกให้คะแนนความชอบในแต่ละทักษะซึ่งเรียงจากน้อยไปมาก 0 คือไม่ชอบเลย ถึง 5 คือชอบมากที่สุด โดยสามารถคลิกที่ชื่อทักษะเพื่อดูคำอธิบายว่าทักษะนี้เกี่ยวข้องกับอะไร
                                    </p>
                                </div>
                                <div class="overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-6">
                                {skills.map((skill, index) => (
                                    <div >
                                        <div class="min-w-full ">
                                            <div class="border-double border-l-8 border-dark-yellow  px-3 py-2 shadow-md bg-white">
                                                <span className="flex flex-wrap">
                                                    <button class="accordion-button collapsed relative flex items-center w-fit py-2 lg:px-3 text-base text-gray-800 text-left
                                                    border-0 transition focus:outline-none hover:bg-amber-50 rounded-full" 
                                                    type="button" data-bs-toggle="collapse" 
                                                    data-bs-target={"#"+"l"+skill.name.replace(/[^A-Z0-9]+/ig, "_")}
                                                    aria-expanded="false" aria-controls={"l"+skill.name.replace(/[^A-Z0-9]+/ig, "_")}>
                                                        <div className="w-full flex justify-between">
                                                            <span className="">ทักษะ: {skill.name}</span>
                                                            <span className=" pr-2 text-blue-500 text-3xl relative"><RiArrowDropDownLine></RiArrowDropDownLine></span>
                                                        </div>
                                                    </button>
                                                </span>
                                                <div className="flex justify-between">
                                                    <span className="inline-block align-baseline py-2">ความชอบ:</span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name} id={index} value={0} onChange={handleLikesLevelChange}></input>
                                                        <label>0</label>
                                                    </span>
                                                    {skill.levels.map((level) => (
                                                        <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                            <input type="radio" name={skill.name} id={skill._id} value={level.level_id} onChange={handleLikesLevelChange}></input>
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
                                                        <span className="text-md underline underline-offset-4 decoration-dark-yellow decoration-2">
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
                        <div className="flex justify-end">
                            <button className="green-btn" onClick={addLikes}>
                                <div className="flex justify-center">
                                    <span className="block px-2 lg:px-1"><TfiSave className="h-6 w-6"></TfiSave></span>
                                    <span className="block px-2 lg:px-1">บันทึกข้อมูล</span>  
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                </div>

            </div>
            
        </div>
    )
}

export default StuFillInformation;