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
            label: 'ระดับทักษะ',
            backgroundColor: 'rgb(214, 189, 255, 0.2)',
            borderColor: '#B080FF',
            borderWidth: 1,
            hoverBackgroundColor: '#D6BDFF',
            hoverBorderColor: '#FFF296',
            data: skills[1]
          }
        ]
    };


    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <div>
                    <div className="card shadow-md bg-white p-4 m-4 ">
                        <h5 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-600 text-2xl w-fit">Skill Mapping คืออะไร?</h5>
                        <p className="text-md md:text-xl text-gray-600 p-2">&nbsp; &nbsp; Skill Mapping คือ เว็บไซต์ที่จะเป็นตัวช่วยสำหรับนักศึกษาวิศวกรรมคอมพิวเตอร์ให้ไปสู่อาชีพที่ต้องการ เพื่อให้นักศึกษาได้รู้ถึงทักษะของตนเองจากรายวิชาที่เคยเรียน ซึ่งสามารถดูได้จากเมนูสรุปข้อมูล 
                        สำหรับนักศึกษาที่มีอาชีพที่สนใจสามารถดูข้อมูลเกี่ยวกับอาชีพได้ที่เมนูวิเคราะห์อาชีพ และนักศึกษาที่ยังไม่มีอาชีพที่สนใจสามารถใช้เมนูแนะนำอาชีพเพื่อให้ช่วยแนะนำอาชีพที่น่าจะเหมาะสมกับทักษะที่ตนเองมีได้</p>
                    </div>
                </div>
                <div>
                    <Instruction></Instruction>
                </div>
                <div className="card shadow-md bg-white p-4 m-4">
                    <div className="flex justify-center">
                        <h5 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-600 text-2xl w-fit">ทักษะของคุณ</h5>
                    </div>
                    <div className="grid justify-items-center w-full">
                            <Radar options={options} data={dataBar} className="max-h-screen max-w-screen-xl lg:p-5" />
                    </div>
                    
                    <p className="flex justify-end text-sm md:text-md text-gray-500">บันทึกข้อมูลเมื่อ: {updateDate}</p>
                </div>
                <div>
                    <UserType></UserType>
                </div>
            </div>
        </div>
    );
}

export default StuHome;