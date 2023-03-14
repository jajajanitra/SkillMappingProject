import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {BsEmojiDizzy, BsEmojiAngry, BsEmojiFrown, BsEmojiExpressionless, BsEmojiSmile, BsEmojiLaughing} from 'react-icons/bs';
import {BsClipboard, BsTools, BsBookmarkHeart} from 'react-icons/bs';
import {RiArrowDropDownLine, RiLoader2Fill} from 'react-icons/ri';
import {TfiSave} from 'react-icons/tfi';
import {MdAdd} from 'react-icons/md';


import { Server_URL, Skill_URL, Course_URL } from "../constants";

import NavBar from "../components/NavBar";
import useToken from '../components/UseToken';

const MySwal = withReactContent(Swal);

function StuFillInformation () {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selfSkills, setSelfSkills] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [likes, setLikes] = useState([]);
    const [student, setStudent] = useState({});
    const { token} = useToken();

    const requestSkills = axios.get(Skill_URL);
    const requestCourses = axios.get(Course_URL+"/"+token);
    const addSkills_URL = Server_URL+"/student/selfs";
    const addLikes_URL = Server_URL+"/student/likes";
    const stuToken = token;
    const requestStudent = axios.get(Server_URL+"/student/"+stuToken);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestSkills, requestCourses, requestStudent])
        .then(
            axios.spread((...responses) => {
                const resSkills = responses[0].data;
                const data = [...resSkills]
                setSkills(data);
                const resCourses = responses[1].data;
                setCourses(resCourses);
                setFilteredCourses(resCourses);
                const resStudent = responses[2].data;
                setStudent(resStudent.skillslist);
                setSelfSkills(resStudent.skillslist);
                setLikes(resStudent.skillslist);
                // console.log(student);
                
            }
        ))
        // console.log(skills);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value.toLowerCase());
        
    };

    const searchID = () => {
        setFilteredCourses(courses.filter((course) => {
            if (searchInput === '') {
                return course;
            }
            //return the item which contains the user input
            else {
                return course.name.toLowerCase().includes(searchInput) || course.id.toLowerCase().includes(searchInput)
            }
        }))
    };

    const handleSkillsLevelChange = (event, name) => {
        const index = selfSkills.findIndex(object => {
            return object.skill_name === name;
        });
        // console.log(event.target.value);
        const level = event.target.value;
        let tempSkill = student;
        tempSkill[index].skill_self = level;
        setSelfSkills(tempSkill);
    };

    const handleLikesLevelChange = (event) => {
        const name = event.target.name;
        const index = likes.findIndex(object => {
            return object.skill_name === name;
        });
        // const index = event.target
        const level = event.target.value;
        let tempSkill = student;
        tempSkill[index].skill_like = level;
        setLikes(tempSkill);
    };

    const addSelfSkills = async () => {
        setLoading(true);
        console.log(selfSkills);

        await axios.post(addSkills_URL,{
            token: token,
            skill: selfSkills
        }).then((res) => {
            console.log(res.status);
            setLoading(false);
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
            setLoading(false);
            console.log(err);
        })

    };

    const addLikes = async () => {
        setLoading(true);
        console.log("likeArr",likes);

        await axios.post(addLikes_URL,{
            token: token,
            skill: likes
        }).then((res) => {
            console.log(res.status);
            setLoading(false);
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
            setLoading(false);
            console.log(err);
        })
    };

    const handleCheckChange = (event, course) => {
        if(event.target.checked){
            selectedCourses.push(course);    
        }else{
            setSelectedCourses(selectedCourses.filter((selCourse) => {
                return selCourse._id != course._id ;
            }));
        }
    };

    const addCourses = async () => {
        setLoading(true);
        await axios.post(Server_URL+'/student/courses',{
            token: token,
            courses: selectedCourses   
        })
        .then(
            (res) => {
                console.log(res);
                setLoading(false);
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
        .catch((err) => {
            setLoading(false);
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
                    aria-controls="tabs-homeJustify" aria-selected="true"><span className="flex justify-center"><BsClipboard className="lg:h-7 mr-2"></BsClipboard>รายวิชา</span></a>
                </li>
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-profileJustify" class="fillInfo-tab" 
                    id="tabs-profile-tabJustify" 
                    data-bs-toggle="pill" 
                    data-bs-target="#tabs-profileJustify" role="tab"
                    aria-controls="tabs-profileJustify" aria-selected="false"><span className="flex justify-center"><BsTools className="lg:h-7 mr-2"></BsTools>ทักษะ</span></a>
                </li>
                <li class="nav-item flex-grow text-center" role="presentation">
                    <a href="#tabs-messagesJustify" class="fillInfo-tab" 
                    id="tabs-messages-tabJustify" 
                    data-bs-toggle="pill" 
                    data-bs-target="#tabs-messagesJustify" role="tab"
                    aria-controls="tabs-messagesJustify" aria-selected="false"><span className="flex justify-center"><BsBookmarkHeart className="lg:h-7 mr-2"></BsBookmarkHeart> ความชอบ</span></a>
                </li>
                </ul>
                <div class="tab-content" id="tabs-tabContentJustify">
                    <div class="tab-pane fade show active" id="tabs-homeJustify" role="tabpanel"
                    aria-labelledby="tabs-home-tabJustify">
                        <div>
                            <h5 className="sub-header">รายวิชาที่เคยเรียน</h5>
                            <p className="px-2">
                                    &nbsp; &nbsp;เลือกรายวิชาของภาควิชาวิศวกรรมคอมพิวเตอร์ที่เคยเรียนทั้งหมด จากนั้นกดปุ่มบันทึกเพื่อบันทึกข้อมูล
                            </p>
                        </div>

                        <div className="flex flex-wrap lg:grid lg:grid-flow-row-dense lg:grid-cols-6 lg:gap-4 mb-2 p-2">
                            <input
                            className="h-10 w-full p-2 mx-2 my-2 md:my-1 lg:col-span-5"
                            type="ืีnumber"
                            placeholder="ค้นหาโดยชื่อหรือรหัสวิชา"
                            onChange={handleSearchChange}
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
                        
                        <div className="grid my-3 ">
                            {courses.length > 0 ? (
                                <table className="text-m text-left ml-4 mr-4 mt-3 p-2 border ">
                                    <thead className="bg-purple-100 p-2">
                                        <tr>
                                            <th className="header-courses-table md:text-lg lg:pl-4">รหัสวิชา</th>
                                            <th className="header-courses-table md:text-lg lg:pl-3">ชื่อวิชา</th>
                                            <th className="header-courses-table md:text-lg lg:pl-3">หัวข้อ</th>
                                            <th className="header-courses-table text-center w-36 md:text-lg lg:pl-3">เพิ่ม</th>    
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredCourses.map((course, index) => (
                                            <tr className="border-b odd:bg-white even:bg-gray-50 hover:bg-sky-50">
                                                <td className="data-course-table p-3">{course.id}</td>
                                                <td className="data-course-table py-3">{course.name}</td>
                                                <td className="data-course-table">{course.sel_topic}</td>
                                                <td className="text-center data-course-table">
                                                    <input type="checkbox" onChange={event => handleCheckChange(event, course)} disabled={loading ? true : false} className="ml-2">
                                                    </input>
                                                </td>
                                            </tr>
                                            
                                        ))}    
                                    </tbody>

                                </table>   
                            ):(
                                    <span></span>
                            )}            
                        </div>
                        <div className="flex justify-end">
                            <button className={loading ?"disabled-btn":"green-btn"} onClick={addCourses} disabled={loading ? true : false}>
                                <div className="flex justify-center">
                                    <span className="block px-2 lg:px-1">{loading ? <RiLoader2Fill className="h-6 w-6"></RiLoader2Fill> : <TfiSave className="h-6 w-6"></TfiSave>}</span>
                                    <span className="block px-2 lg:px-1">{loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}</span>  
                                </div>
                            </button>
                        </div>
                    </div>

                <div class="tab-pane fade" id="tabs-profileJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                    <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div>
                                    <h5 className="sub-header">ประเมินระดับทักษะด้วยตนเอง</h5>
                                    <p className="px-2">
                                    &nbsp; &nbsp;เลือกระดับทักษะของตนเองในแต่ละทักษะซึ่ง 0 คือไม่มีทักษะ โดยสามารถคลิกที่ชื่อทักษะเพื่อดูคำอธิบายว่าทักษะนี้ในแต่ละระดับจะต้องมีความสามารถทำอะไรได้บ้าง แล้วเลือกระดับที่เหมาะสมกับตนเอง เมื่อเลือกระดับที่ต้องการทั้งหมดเรียบร้อยกดปุ่มบันทึกข้อมูลด้านล่างเพื่อบันทึกข้อมูล
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
                                                        <input type="radio" name={skill.name+"skill"} id={skill._id+"0"} value={0} onChange={event => handleSkillsLevelChange(event, skill.name)} defaultChecked={student[index]?.skill_self == 0} className="hidden peer/level0"></input>
                                                        <label for={skill._id+"0"} className="level-label peer-checked/level0:bg-cyan-400 rounded-full peer-checked/level0:text-white">0</label>
                                                    </span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name+"skill"} id={skill._id+"1"} value={1} onChange={event => handleSkillsLevelChange(event, skill.name)} defaultChecked={student[index]?.skill_self === '1'} className="hidden peer/level1"></input>
                                                        <label for={skill._id+"1"} className="level-label peer-checked/level1:bg-cyan-400 rounded-full peer-checked/level1:text-white ">1</label>
                                                    </span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name+"skill"} id={skill._id+"2"} value={2} onChange={event => handleSkillsLevelChange(event, skill.name)} defaultChecked={student[index]?.skill_self === '2'} className="hidden peer/level2"></input>
                                                        <label for={skill._id+"2"} className="level-label peer-checked/level2:bg-cyan-400 rounded-full peer-checked/level2:text-white ">2</label>
                                                    </span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name+"skill"} id={skill._id+"3"} value={3} onChange={event => handleSkillsLevelChange(event, skill.name)} defaultChecked={student[index]?.skill_self === '3'} className="hidden peer/level3"></input>
                                                        <label for={skill._id+"3"} className="level-label peer-checked/level3:bg-cyan-400 rounded-full peer-checked/level3:text-white ">3</label>
                                                    </span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name+"skill"} id={skill._id+"4"} value={4} onChange={event => handleSkillsLevelChange(event, skill.name)} defaultChecked={student[index]?.skill_self === '4'} className="hidden peer/level4"></input>
                                                        <label for={skill._id+"4"} className="level-label peer-checked/level4:bg-cyan-400 rounded-full peer-checked/level4:text-white ">4</label>
                                                    </span>
                                                    <span className="text-sm text-gray-900 font-light p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                                        <input type="radio" name={skill.name+"skill"} id={skill._id+"5"} value={5} onChange={event => handleSkillsLevelChange(event, skill.name)} defaultChecked={student[index]?.skill_self === '5'} className="hidden peer/level5"></input>
                                                        <label for={skill._id+"5"} className="level-label peer-checked/level5:bg-cyan-400 rounded-full peer-checked/level5:text-white ">5</label>
                                                    </span>
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
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 ">{level.level_thai}</td>
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
                            <button className={loading ?"disabled-btn":"green-btn"} onClick={addSelfSkills} disabled={loading ? true : false}>
                                <div className="flex justify-center">
                                    <span className="block px-2 lg:px-1">{loading ? <img className="h-6 w-6" src={require("../images/loading.gif")}></img> : <TfiSave className="h-6 w-6"></TfiSave>}</span>
                                    <span className="block px-2 lg:px-1">{loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}</span>  
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
                                    <p className="px-2 m-0">
                                    &nbsp; &nbsp;เลือกให้คะแนนความชอบในแต่ละทักษะซึ่งเรียงจากน้อยไปมาก โดยสามารถคลิกที่ชื่อทักษะเพื่อดูคำอธิบายว่าทักษะนี้เกี่ยวข้องกับอะไร เมื่อเลือกระดับที่ต้องการทั้งหมดเรียบร้อยกดปุ่มบันทึกข้อมูลด้านล่างเพื่อบันทึกข้อมูล
                                    </p>
                                    <h6 className="px-2 mt-2 underline ">ระดับของความชอบ</h6>
                                    <div className=" px-2 mb-3 md:flex md:justify-between md:p-4 ">
                                        <span className="flex p-2 md:grid md:justify-items-center"><BsEmojiAngry className="h-6 w-6 text-red-600 mr-2 md:mr-0"></BsEmojiAngry>ไม่ชอบ</span>
                                        <span className="flex p-2 md:grid md:justify-items-center"><BsEmojiFrown className="h-6 w-6 text-orange-500 mr-2 md:mr-0"></BsEmojiFrown>ไม่ค่อยชอบ</span>
                                        <span className="flex p-2 md:grid md:justify-items-center"><BsEmojiExpressionless className="h-6 w-6 text-yellow-400 mr-2 md:mr-0"></BsEmojiExpressionless>เฉยๆ</span>
                                        <span className="flex p-2 md:grid md:justify-items-center"><BsEmojiSmile className="h-6 w-6 text-lime-500 mr-2 md:mr-0"></BsEmojiSmile>ค่อนข้างชอบ</span>
                                        <span className="flex p-2 md:grid md:justify-items-center"><BsEmojiLaughing className="h-6 w-6 text-green-500 mr-2 md:mr-0"></BsEmojiLaughing>ชอบมาก</span>
                                    </div>
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
                                                            <span className=" text-blue-500 text-3xl relative"><RiArrowDropDownLine></RiArrowDropDownLine></span>
                                                        </div>
                                                    </button>
                                                </span>
                                                <div className="flex justify-between">
                                                    <span className="inline-block align-baseline py-2">ความชอบ:</span>

                                                    <input type="radio" name={skill.name} id={index+"-1"} value={0} onChange={handleLikesLevelChange} class="hidden peer/1" defaultChecked={student[index]?.skill_like == 0}/>
                                                        <label for={index+"-1"} class="emoji-label peer-checked/1:text-red-600 ">                           
                                                            <BsEmojiAngry className="h-6 w-6"></BsEmojiAngry>
                                                        </label>

                                                    <input type="radio" name={skill.name} id={index+"-2"} value={1} onChange={handleLikesLevelChange} class="hidden peer/2" defaultChecked={student[index]?.skill_like == 1}/>
                                                        <label for={index+"-2"} class="emoji-label peer-checked/2:text-orange-500 ">                           
                                                            <BsEmojiFrown className="h-6 w-6"></BsEmojiFrown>
                                                        </label>

                                                    <input type="radio" name={skill.name} id={index+"-3"} value={2} onChange={handleLikesLevelChange} class="hidden peer/3" defaultChecked={student[index]?.skill_like == 2}/>
                                                        <label for={index+"-3"} class="emoji-label peer-checked/3:text-yellow-400 ">                           
                                                            <BsEmojiExpressionless className="h-6 w-6"></BsEmojiExpressionless>
                                                        </label>

                                                    <input type="radio" name={skill.name} id={index+"-4"} value={3} onChange={handleLikesLevelChange} class="hidden peer/4" defaultChecked={student[index]?.skill_like == 3}/>
                                                        <label for={index+"-4"} class="emoji-label peer-checked/4:text-lime-500 ">                           
                                                            <BsEmojiSmile className="h-6 w-6"></BsEmojiSmile>
                                                        </label>

                                                    <input type="radio" name={skill.name} id={index+"-5"} value={4} onChange={handleLikesLevelChange} class="hidden peer/5" defaultChecked={student[index]?.skill_like == 4}/>
                                                        <label for={index+"-5"} class="emoji-label peer-checked/5:text-green-500 ">                           
                                                            <BsEmojiLaughing className="h-6 w-6"></BsEmojiLaughing>
                                                        </label>


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
                                                            &nbsp; &nbsp;{skill.des_thai}   
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
                            <button className={loading ?"disabled-btn":"green-btn"} onClick={addLikes} disabled={loading ? true : false}>
                                <div className="flex justify-center">
                                    <span className="block px-2 lg:px-1">{loading ? <img className="h-6 w-6" src={require("../images/loading.gif")}></img> : <TfiSave className="h-6 w-6"></TfiSave>}</span>
                                    <span className="block px-2 lg:px-1">{loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}</span>  
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