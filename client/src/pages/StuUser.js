import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {RiDeleteBin7Line, RiEditLine} from 'react-icons/ri';

import { Server_URL } from "../constants";

import NavBar from "../components/NavBar";
import useToken from '../components/UseToken';

const MySwal = withReactContent(Swal);

function StuUser () {
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({});
    const { token} = useToken();

    const stuToken = token;
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
            setLoading(true);
            if (result.isConfirmed) {
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
                        <h6 className="pink-left-border">ระดับทักษะที่ได้รับจากรายวิชาที่เรียน</h6>
                            <table class="w-full text-left my-3">
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
                        <h6 className="pink-left-border">ระดับทักษะจากการประเมินตนเอง</h6>
                            <table class="w-full text-left my-3">
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

                </div>
            </div>
        </div>
    )
}

export default StuUser;

 