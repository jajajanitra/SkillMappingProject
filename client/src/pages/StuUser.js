import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL } from "../constants";

import NavBar from "../components/NavBar";

function StuUser () {
    const [student, setStudent] = useState({});

    const stuToken = '12345';
    const requestStudent = axios.get(Server_URL+"/student/"+stuToken);
    

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

    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header">ข้อมูลผู้ใช้</h4>
                <div className="py-2">
                    <div className="mb-3 px-3 py-2 lg:p-4">
                        <h6 className="text-lg">ชื่อ: {student.student_name}</h6>
                        <h6 className="text-lg">รหัสนักศึกษา: {student.student_id}</h6>
                    </div>

                    <div className="grid gird-flow-row lg:grid-cols-2 lg:gap-8 p-2 lg:p-4 " >
                        <div className="mb-2">
                            <h6 className="text-lg border-solid border-l-4 border-pink-700 pl-2">รายวิชาที่เรียน</h6>
                            <table class="w-full text-left my-3">
                                <thead class="border-b bg-purple-100">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium px-2 py-4 text-center">
                                        รหัสวิชา
                                    </th>
                                    <th scope="col" class="text-sm font-medium px-2 py-4">
                                        ชื่อวิชา
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.courses?.map((course, index) => (
                                        <tr className="bg-white border-b ">
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 text-center w-fit">{course.course_id} </td>
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 ">{course.course_name}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>

                        </div>

                        <div className="mb-2">
                            <h6 className="text-lg border-solid border-l-4 border-pink-700 pl-2">ระดับทักษะ</h6>
                            <table class="w-full text-left my-3">
                                <thead class="border-b bg-purple-100">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium px-2 py-4 text-center w-fit">
                                        ระดับทักษะ
                                    </th>
                                    <th scope="col" class="text-sm font-medium px-2 py-4 text-center w-fit">
                                        ระดับความชอบ
                                    </th>
                                    <th scope="col" class="text-sm font-medium px-2 py-4">
                                        ทักษะ
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.skills?.map((skill) => (
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 text-center max-w-fit">{skill.level_id}</td>
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 text-center max-w-fit">{skill.level_id}</td>
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 ">{skill.skill_name} </td>
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

 