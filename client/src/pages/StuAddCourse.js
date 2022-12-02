import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Course_URL } from "../constants";

import SideBar from "../components/SideBar";

function StuAddCourse () {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const requestCourses = axios.get(Course_URL);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestCourses])
        .then(
            axios.spread((...responses) => {
                const resCourses = responses[0];
                setCourses(resCourses.data);
            }
        ))
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
            <div className="w-full p-2">
                <h3 className="top-header">รายวิชาที่เรียน</h3>

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
                                <th className="p-2">รหัสวิชา</th>
                                <th className="p-2">ชื่อวิชา</th>
                                <th className="p-2">หัวข้อ</th>
                                <th className="text-center">เพิ่ม</th>    
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
            
        </div>
    )
}

export default StuAddCourse;