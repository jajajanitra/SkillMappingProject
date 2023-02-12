import React, { useState, useEffect } from "react";
import {Navigate } from 'react-router-dom';
import axios from "axios";

import {AiOutlineHome, AiOutlineLike, AiOutlineBulb, AiOutlineFileSearch, AiOutlineUser} from 'react-icons/ai';
import {BiBookAdd} from 'react-icons/bi';

import useToken from '../components/UseToken';
import useInfo from '../components/UseInfo';

import { Server_URL } from "../constants";


function NavBar (){
    const [student, setStudent] = useState({});
    const [openMenu, setOpenMenu] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const { token, removeToken, setToken , isAuthen} = useToken();
    const { stuName, stuEmail, removeStuName, removeStuEmail } = useInfo();

    const stuToken = token;
    const requestStudent = axios.get(Server_URL+"/student/"+stuToken);

    useEffect(() => {
        // console.log(isAuthen);
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestStudent])
        .then(
            axios.spread((...responses) => {
                const resStudent = responses[0];
                setStudent(resStudent.data.student[0]);
            }
            
        ))
        // console.log(student);
    };

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const toggleUserMenu = () => {
        setOpenUser(!openUser);
    }

    const logout = () => {
        setToken(null);
        removeToken();
        removeStuEmail();
        removeStuName();
        window.location.reload();
    }

    if (!isAuthen) {
        return <Navigate replace to="/student_login" />;
    } else {
        return (
            <div>
                <nav class="bg-white boder border-b-2 px-2 sm:px-4 py-2.5 rounded fixed w-full z-20 top-0 left-0 border-gray-200">
                    <div class=" flex flex-wrap items-center justify-between mx-4 lg:mx-16 lg:px-2">
                    <a href="" class="flex items-center no-underline">
                        <img src="../Images/SkillMappingLogo.png" class="h-12 mr-3" alt="SkillMapping Logo" />
                        <span class="text-xl text-purple-600">Skill Mapping</span>
                    </a>
                    <div class="flex items-center lg:order-2">
                        <button type="button" class="flex mr-3 text-sm rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={toggleUserMenu}>
                            <span class="sr-only">Open user menu</span>
                            <img src={require("../images/User.png")} class="w-10 h-10 rounded-full"  alt="User photo" />
                        </button>
                        {/* for user */}
                        <div class={openUser ? "absolute right-4 top-20 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" : "hidden"} id="user-dropdown">
                            <div class="px-4 py-3">
                            <span class="block text-sm text-gray-900 ">{stuName}</span>
                            <span class="block text-sm font-medium text-gray-500 truncate ">{stuEmail}</span>
                            </div>
                            <ul class="py-1" aria-labelledby="user-menu-button">
                                <li><button onClick={logout}>logout</button></li>
                            </ul>
                        </div>
                        <button type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false" onClick={toggleMenu}>
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-6 h-6 text-dark-purple-font" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div class={openMenu ? "items-center justify-between w-full h-fit lg:flex lg:w-auto lg:order-1" : "items-center justify-between hidden w-full h-fit lg:flex lg:w-auto lg:order-1" } id="mobile-menu-2">
                        <ul class="flex flex-col p-2  my-2 rounded-lg bg-purple-50 lg:flex-row lg:space-x-8  lg:text-sm md:font-medium  lg:bg-white ">
                            <li className='text-sm flex-items-center gap-x-4 p-2
                            rounded-md mt-1'>
                                <a href="/student_home"
                                className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                    <div>
                                    <span className={`block float-left text-xl mr-2 `}><AiOutlineHome/></span>
                                    <span className={`text-base font-medium flex-1 `}>หน้าแรก</span>      
                                    </div>                      
                                </a>
                            </li>

                            <li className='text-sm flex-items-center gap-x-4 p-2
                            rounded-md mt-1'>
                                <a href="/student_fillInformation"
                                className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                    <div>
                                    <span className={`block float-left text-xl mr-2 `}><BiBookAdd /></span>
                                    <span className={`text-base font-medium flex-1 `}>กรอกข้อมูล</span>
                                    </div>
                                </a>
                            </li>

                            <li className='text-sm flex-items-center gap-x-4 p-2
                            rounded-md mt-1'>
                                <a href="/student_careers"
                                className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                    <div>
                                    <span className={`block float-left text-xl mr-2 `}><AiOutlineFileSearch /></span>
                                    <span className={`text-base font-medium flex-1 `}>วิเคราะห์อาชีพ</span>   
                                    </div>                         
                                </a>
                            </li>

                            <li className='text-sm flex-items-center gap-x-4 p-2
                            rounded-md mt-1'>
                                <a href="/student_suggestion"
                                className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                    <div>
                                    <span className={`block float-left text-xl mr-2 `}><AiOutlineBulb /></span>
                                    <span className={`text-base font-medium flex-1 `}>แนะนำอาชีพ</span>
                                    </div>
                                </a>
                            </li>

                            <li className='text-sm flex-items-center gap-x-4 p-2
                            rounded-md mt-1'>
                                <a href="/student_user"
                                className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                    <div>
                                    <span className={`block float-left text-xl mr-2 `}><AiOutlineUser /></span>
                                    <span className={`text-base font-medium flex-1 `}>สรุปข้อมูล</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>


            </div>
        )
    }
};

export default NavBar;