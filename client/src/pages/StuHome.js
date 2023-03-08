import React, { useState, useEffect } from "react";
import axios from "axios";
import UserType from "../components/UserType";
import NavBar from "../components/NavBar";
import Instruction from "../components/Instrction";

import { Radar } from 'react-chartjs-2';

import { Server_URL } from "../constants";
import useToken from '../components/UseToken';

function StuHome () {
    const [skills, setSkills] = useState({});
    const [updateDate, setUpdateDate] = useState('');
    const { token} = useToken();

    const stuToken = token;
    const requestStudent = axios.get(Server_URL+"/student/skills/"+stuToken);
    

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestStudent])
        .then(
            axios.spread((...responses) => {
                const resStudent = responses[0];
                setSkills(resStudent.data.skills);
                setUpdateDate(resStudent.data.date)
                console.log(resStudent.data);
            }
            
        ))
        console.log(skills);
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

    const dataBar = {
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


    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <div>
                    <div className="card shadow-md bg-white p-4 m-4 ">
                        <h5 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-600 text-2xl w-fit">CPE CAREER IDEAS คืออะไร?</h5>
                        <p className="text-md md:text-xl text-gray-600 p-2">&nbsp; &nbsp; CPE CAREER IDEAS คือ เว็บไซต์ที่จะเป็นตัวช่วยสำหรับนักศึกษาวิศวกรรมคอมพิวเตอร์ให้ไปสู่อาชีพที่ต้องการ เพื่อให้นักศึกษาได้รู้ถึงทักษะของตนเองจากรายวิชาที่เคยเรียน ซึ่งสามารถดูได้จากเมนูสรุปข้อมูล 
                        สำหรับนักศึกษาที่มีอาชีพที่สนใจสามารถดูข้อมูลเกี่ยวกับอาชีพได้ที่เมนูวิเคราะห์อาชีพ และนักศึกษาที่ยังไม่มีอาชีพที่สนใจสามารถใช้เมนูแนะนำอาชีพเพื่อให้ช่วยแนะนำอาชีพที่น่าจะเหมาะสมกับทักษะที่ตนเองมีได้</p>
                    </div>
                </div>
                <div>
                    <div className="card shadow-md bg-white p-4 m-4 ">
                        <h5 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-600 text-2xl w-fit">วิธีการใช้งาน</h5>
                        <p className="text-md md:text-xl text-gray-600 p-2">&nbsp; &nbsp;สำหรับการใช้งานของเว็บไซต์ ผู้ใช้ต้องทำการกรอกข้อมูลและบันทึกข้อมูลทั้ง 3 ส่วนให้เรียบร้อยก่อนได้แก่ รายวิชา ทักษะ และ ความชอบ ในเมนูกรอกข้อมูล
                        &nbsp;เมื่อกรอกข้อมูลเรียบร้อยแล้วหากมีอาชีพที่สนใจที่ต้องการจะดูรายละเอียดให้ไปที่เมนูวิเคราะห์อาชีพ เพื่อค้นหาอาชีพที่ต้องการ แต่หากยังไม่มีอาชีพที่สนใจต้องการให้ช่วยแนะนำอาชีพ ให้เข้าไปที่เมนูแนะนำอาชีพ
                        &nbsp;หากกรอกข้อมูลรายวิชาผิดพลาดสามารถเข้าไปแก้ไขได้ที่เมนูสรุปข้อมูล ส่วนข้อมูลทักษะและความชอบสามารถแก้ในเมนูกรอกข้อมูลแล้วบันทึกใหม่อีกครั้ง</p>
                    </div>
                </div>
                <div>
                    <Instruction></Instruction>
                </div>
                <div>
                    <UserType></UserType>
                </div>
                <div className="card shadow-md bg-white p-4 m-4">
                    <div className="grid cols-1 ">
                        <div className="flex justify-center">
                            <h5 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-600 text-2xl w-fit">ทักษะของคุณ</h5>
                        </div>
                        <p className="text-sm md:text-md text-gray-500 flex justify-center">บันทึกข้อมูลเมื่อ: {updateDate}</p>
                    </div>
                    <div className="grid justify-items-center w-full">
                            <Radar options={options} data={dataBar} className="max-h-[48rem] max-w-screen-xl lg:p-5" />
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default StuHome;