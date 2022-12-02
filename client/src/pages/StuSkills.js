import React, { useState, useEffect } from "react";
import axios from "axios";

import { Server_URL, Skill_URL } from "../constants";

import SideBar from "../components/SideBar";

function StuSkills () {
    const [skills, setSkills] = useState([]);
    const [open, setOpen] = useState([]);

    const requestSkills = axios.get(Skill_URL);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestSkills])
        .then(
            axios.spread((...responses) => {
                const resSkills = responses[0];
                setSkills(resSkills.data);
              }
        ))
        setOpen(new Array(skills.length).fill(false));
    };

    const handleOpenChange = (event) => {
        var index = event.target.value;
        setOpen();
        console.log("click", index);
    };

    return (
        <div className="flex">
            <SideBar></SideBar>
            <div className="w-full p-2">
                <h3 className="top-header">ความชอบของทักษะ</h3>

                {skills.map((skill, index) => (
                    <table className="">
                        <tr>
                            <th></th>
                            <th>ทักษะ</th>
                            <th colSpan="5">ระดับ</th>    
                        </tr>
                        
                        <tr>
                            <td><button className="yellow-btn" value={index} onClick={handleOpenChange}>ดูคำอธิบาย</button></td>
                            <td>{skill.name}</td>
                            {skill.levels.map((level) => (
                                <td className="level-col">
                                    <input type="radio" name={skill.name} id={index} value={level.level_id}></input>
                                    <label>{level.level_id}</label>
                                </td>
                            ))}
                        </tr>

                        <tr>คำอธิบายทักษะ</tr>
                        <tr><td colSpan="7">{skill.des}</td></tr>
                        <tr>คำอธิบายสำหรับแต่ละระดับ</tr>
                        {skill.levels.map((level) => (
                                <tr className="">
                                    <td colSpan="6">{level.level_id} {level.level_des}</td>
                                </tr>
                            ))}

                        <br/>
                    </table>

                ))}

                
                
            </div>
        </div>
    )
}

export default StuSkills;