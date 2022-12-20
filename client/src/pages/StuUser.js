import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL } from "../constants";

import SideBar from "../components/SideBar";

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
        <div className="flex">
            <SideBar></SideBar>
            <div className="p-4 w-full">
                <h4>ข้อมูลผู้ใช้</h4>
                <div className="py-2">
                    <div>
                        <h6>ชื่อ: {student.student_name}</h6>
                        <h6>รหัสนักศึกษา: {student.student_id}</h6>
                    </div>

                    <div className="grid grid-cols-2 gap-6 p-4" >
                        <div>
                            <h6>รายวิชาที่เรียน</h6>
                            <table class="w-full text-left my-3">
                                <thead class="border-b bg-gray-100">
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
                                        <tr className="bg-white border-b">
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 text-center w-fit">{course.course_id} </td>
                                            <td className="text-sm text-gray-900 font-light px-2 py-4 ">{course.course_name}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>

                        </div>

                        <div>
                            <h6>ระดับทักษะ</h6>
                            <table class="w-full text-left my-3">
                                <thead class="border-b bg-gray-100">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium px-2 py-4 text-center">
                                        ระดับทักษะ
                                    </th>
                                    <th scope="col" class="text-sm font-medium px-2 py-4 text-center">
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

 