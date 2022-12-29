import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {RiDeleteBin7Line} from 'react-icons/ri';

import { Server_URL } from "../constants";

import NavBar from "../components/NavBar";

const MySwal = withReactContent(Swal);

function StuUser () {
    const [student, setStudent] = useState({});

    const stuToken = '12345';
    const requestStudent = axios.get(Server_URL+"/student/"+stuToken);
    const deleteURL = Server_URL+"/student/delete";
    

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestStudent])
        .then(
            axios.spread((...responses) => {
                const resStudent = responses[0];
                setStudent(resStudent.data[0]);
                console.log(resStudent.data[0].courses);
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
                await axios.post(deleteURL,data)
                    .then((res) => {
                        console.log(res.status);
                        if (res.status === 200){
                            Swal.fire({
                            title: 'ลบข้อมูลเรียบร้อย!',
                            text: 'รายวิชานี้ถูกลบออกจากรายวิชาที่เรียนแล้ว',
                            icon: 'success',
                            confirmButtonColor: '#84cc16'
                            })
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
            }
          })
        

    };

    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header">สรุปข้อมูล</h4>
                <div className="py-2">
                    {/* <div className="mb-3 px-3 py-2 lg:p-4">
                        <h6 className="text-lg">ชื่อ: {student.student_name}</h6>
                        <h6 className="text-lg">รหัสนักศึกษา: {student.student_id}</h6>
                    </div> */}

                    <div className="mb-4">
                        <h6 className="text-xl border-solid border-l-4 border-pink-700 pl-2">รายวิชาที่เรียน</h6>
                        <table class="w-full text-left my-3">
                            <thead class="border-b bg-yellow-100">
                                <tr>
                                <th scope="col" class="text-sm font-medium pl-4 pr-1 py-4">
                                    รหัสวิชา
                                </th>
                                <th scope="col" class="text-sm font-medium pl-4 pr-1 py-4">
                                    ชื่อวิชา
                                </th>
                                <th>

                                </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {student.courses?.map((course, index) => (
                                    <tr className="bg-white border-b ">
                                        <td className="text-sm text-gray-900 font-light pl-4 pr-1 py-4 w-fit">{course.course_id} </td>
                                        <td className="text-sm text-gray-900 font-light pl-4 pr-1 py-4 ">{course.course_name}</td>
                                        <td className="text-right px-2 lg:px-4">
                                            <button className="delete-btn" value={course.course_id} onClick={e => deleteCourse(e, course.course_name, course.course_id)}>
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

                    <div className="grid gird-flow-row lg:grid-cols-2 lg:gap-8 p-2 lg:p-4 " >
                        <div className="mb-4">
                            <h6 className="text-xl border-solid border-l-4 border-pink-700 pl-2">ระดับทักษะจากรายวิชา</h6>
                            <table class="w-full text-left my-3">
                                <thead class="border-b bg-purple-100">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium pl-4 pr-1 py-4 ">
                                        ทักษะ
                                    </th>
                                    <th scope="col" class="text-sm font-medium px-2 py-4 w-fit text-center ">
                                        ระดับทักษะ
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.skills?.map((skill) => (
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light pl-4 pr-1 py-4 ">{skill.skill_name} </td>
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 max-w-fit text-center ">{skill.level_id}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>

                        </div>

                        <div className="mb-2">
                            <h6 className="text-xl border-solid border-l-4 border-pink-700 pl-2">ระดับทักษะจากการประเมินตนเอง</h6>
                            <table class="w-full text-left my-3">
                                <thead class="border-b bg-purple-100">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium pl-4 pr-1 py-4">
                                            ทักษะ
                                        </th>
                                        <th scope="col" class="text-sm font-medium px-2 py-4 text-center w-fit">
                                            ระดับทักษะ
                                        </th>
                                        <th scope="col" class="text-sm font-medium px-2 py-4 text-center w-fit">
                                            ระดับความชอบ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.skills?.map((skill) => (
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light pl-4 pr-1 py-4 ">{skill.skill_name} </td>
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 text-center max-w-fit">{skill.skill_self}</td>
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 text-center max-w-fit">{skill.skill_like}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default StuUser;

 