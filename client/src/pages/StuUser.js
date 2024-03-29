import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {RiDeleteBin7Line, RiEditLine, RiArrowDropDownLine} from 'react-icons/ri';

import { Server_URL } from "../constants";
import { Radar } from 'react-chartjs-2';

import NavBar from "../components/NavBar";
import useToken from '../components/UseToken';

const MySwal = withReactContent(Swal);

function StuUser () {
    const [loading, setLoading] = useState(false);
    const [showSkill, setShowSkill] = useState(false);
    const [showSelfSkill, setShowSelfSkill] = useState(false);
    const [student, setStudent] = useState({});
    const [skills, setSkills] = useState({});
    const [updateDate, setUpdateDate] = useState('');
    const { token} = useToken();

    const stuToken = token;
    const requestStudent = axios.get(Server_URL+"/student/"+stuToken);
    const requestGraph = axios.get(Server_URL+"/student/skills/"+stuToken);
    const deleteURL = Server_URL+"/student/delete";
    

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestStudent, requestGraph])
        .then(
            axios.spread((...responses) => {
                const resStudent = responses[0];
                const resGraph = responses[1]
                setSkills(resGraph.data.skills);
                setUpdateDate(resGraph.data.date)
                setStudent(resStudent.data.student[0]);
                console.log(resStudent.data[0]);
            }
            
        ))
        console.log(student);
    };

    const deleteCourse = (e, name, id) => {
        console.log(id,name);
        const  data = {
            token: stuToken,
            course_name: name,
            course_id: id
        };
        console.log(data);

        Swal.fire({
            title: 'ต้องการลบรายวิชานี้ใช่ไหม?',
            text: "เมื่อลบข้อมูลแล้วจะไม่สามารถเรียกคืนได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#a3a3a3',
            confirmButtonText: 'ลบรายวิชา',
            cancelButtonText: 'ยกเลิก'
          }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                await axios.post(deleteURL,data)
                    .then((res) => {
                        console.log(res.status);
                        setLoading(false);
                        if (res.status === 200){
                            Swal.fire({
                            title: 'ลบข้อมูลเรียบร้อย!',
                            text: 'รายวิชานี้ถูกลบออกจากรายวิชาที่เรียนแล้ว',
                            icon: 'success',
                            confirmButtonColor: '#84cc16'
                            }).then((result) => {
                                if (result.isConfirmed){
                                    window.location.reload();
                                }
                            });
                        }else{
                            Swal.fire({
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
            }
          })
    };

    const options = {
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
    };

    const data = {
        labels: skills[0],
        datasets: [
          {
            label: 'ระดับทักษะจากรายวิชา',
            backgroundColor: 'rgb(214, 189, 255, 0.2)',
            borderColor: '#B080FF',
            borderWidth: 1,
            hoverBackgroundColor: '#D6BDFF',
            hoverBorderColor: '#FFF296',
            data: skills[1]
          },
          {
            label: 'ระดับทักษะจากการประเมินโดยตนเอง',
            backgroundColor: 'rgba(253, 205, 0, 0.2)',
            borderColor: 'rgba(253, 205, 0, 1)',
            borderWidth: 1,
            hoverBackgroundColor: '#BDE6FF',
            hoverBorderColor: '#FFF296',
            data: skills[2]
          }
        ]
    };

    const toggleShowSkill = () => {
        setShowSkill(!showSkill);
    };

    const toggleShowSelfSkill = () => {
        setShowSelfSkill(!showSelfSkill);
    };

    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header">สรุปข้อมูล</h4>
                <div className="py-2">
                    <h6 className="pink-left-border">รายวิชาที่เรียน</h6>  
                    {student.courses?.length > 0 ? 
                    (
                        <div className="mb-4 p-2">
                            <table class="w-full text-left my-3">
                                <thead class="border-b bg-yellow-100">
                                    <tr>
                                        <th scope="col" class="user-course-header">
                                            รหัสวิชา
                                        </th>
                                        <th scope="col" class="user-course-header">
                                            รายวิชา
                                        </th>
                                        <th></th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.courses?.map((course, index) => (
                                        <tr className="bg-white border-b ">
                                            <td className="md:text-md user-course-data w-fit">{course.course_id} </td>
                                            <td className="md:text-md user-course-data">{course.course_name}</td>
                                            <td className="text-right px-2 lg:px-4">
                                                <button className={loading ? "disabled-btn" : "delete-btn"} value={course.course_id} onClick={e => deleteCourse(e, course.course_name, course.course_id)} disabled={loading ? true : false}>
                                                    <div className="flex items-center">
                                                        <span className="block px-1 content-center"><RiDeleteBin7Line className="h-5 w-5"></RiDeleteBin7Line></span>
                                                        <span className="block pr-1 text-sm">ลบ</span>  
                                                    </div>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ):(
                        <div className="mb-4 p-2 flex justify-center">
                            <p className="px-2">ยังไม่ได้เพิ่มรายวิชา</p>
                            <a href="/student_fillinformation"> กรุณากรอกข้อมูล</a>
                        </div>
                    )
                    } 

                    <div className="grid gird-flow-row lg:grid-cols-2 lg:gap-8 p-2 lg:px-4" >
                        <div className="mb-4">
                            <span className="flex justify-between">
                                <h6 className="pink-left-border">ระดับทักษะที่ได้รับจากรายวิชาที่เรียน</h6>
                                <span className=" pr-2 text-blue-500 text-sm relative"><button className="underline" onClick={toggleShowSkill}>ดูทักษะทั้งหมด</button></span>    
                            </span>
                            <table className={showSkill ? "w-full text-left my-3" : "hidden"}>
                                <thead class="border-b bg-purple-100">
                                    <tr>
                                    <th scope="col" class="md:text-lg user-course-header">
                                        ทักษะ
                                    </th>
                                    <th scope="col" class="md:text-lg user-skill-header">
                                        ระดับทักษะ
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.skills?.map((skill) => (
                                        <tr className="bg-white border-b">
                                            <td className="user-skill md:text-md">{skill.skill_name} </td>
                                            <td className="user-skill-data md:text-md ">{skill.level_id}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>

                        </div>
                        
                        <div className="mb-4">
                            <span className="flex justify-between">
                                <h6 className="pink-left-border">ระดับทักษะจากการประเมินตนเอง</h6>
                                <span className=" pr-2 text-blue-500 text-sm relative"><button className="underline" onClick={toggleShowSelfSkill}>ดูทักษะทั้งหมด</button></span>    
                            </span>
                            
                            <table className={showSelfSkill ? "w-full text-left my-3" : "hidden"}>
                                <thead class="border-b bg-purple-100">
                                    <tr>
                                        <th scope="col" class="md:text-lg user-course-header">
                                            ทักษะ
                                        </th>
                                        <th scope="col" class="md:text-lg user-skill-header">
                                            ระดับทักษะ
                                        </th>
                                        <th scope="col" class="md:text-lg user-skill-header">
                                            ระดับความชอบ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.skills?.map((skill) => (
                                        <tr className="bg-white border-b">
                                            <td className="user-skill md:text-md">{skill.skill_name} </td>
                                            <td className="user-skill-data md:text-md ">{skill.skill_self}</td>
                                            <td className="user-skill-data md:text-md ">{skill.skill_like}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <div className="mb-4 p-2">
                        <h6 className="pink-left-border">กราฟเปรียบเทียบระดับทักษะ</h6>
                        <div className="card bg-white p-4 mx-2 my-3">
                            <div className="grid justify-items-center w-full m-2">
                                    <Radar options={options} data={data} className="max-h-[48rem] max-w-screen-xl lg:p-5" />
                            </div>
                            <div className="grid cols-1 ">
                                <p className="text-sm md:text-md text-gray-500 flex justify-end">บันทึกข้อมูลเมื่อ: {updateDate}</p>
                            </div>
                        </div>    
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StuUser;

 