import React, { useState, useEffect } from "react";
import axios from "axios";
import {Table,Form} from "react-bootstrap";
import '../css/AchievedSkill.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Skill_URL, Course_URL } from "../constants";

const MySwal = withReactContent(Swal);

function AchievedSkill () {
    const [course, setCourse] = useState(0);
    const [options, setOptions] = useState([]);
    const [skills, setSkills] = useState([]);
    const [topic, setTopic] = useState(" ");
    const [isSelTopic, setIsSelTopic] = useState(false);
    const [validated, setValidated] = useState(false);

    const requestCourses = axios.get(Course_URL);
    const requestSkills = axios.get(Skill_URL);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestCourses, requestSkills])
        .then(
            axios.spread((...responses) => {
                const resCourses = responses[0];
                const resSkills = responses[1];
                setOptions(resCourses.data.sort(
                    (p1, p2) => (p1.id > p2.id) ? 1 : (p1.id < p2.id) ? -1 : 0));
                // setOptions(resCourses.data);
                setSkills(resSkills.data);
              }
        ))
    };

    const handleCourseChange = (event) => {
        const index = event.target.selectedIndex;
        const el = event.target.childNodes[index]
        const option =  el.getAttribute('id'); 

        console.log(option,"opt");
        
        if (option === "261494" || option === "261497" || option === "261498" || option === "261499"){
            setIsSelTopic(true);
        }else{
            setIsSelTopic(false);
        }
        // console.log(isSelTopic);
        setCourse(event.target.value);
    };

    const handleSkillsChange = (event) => {
        const { name, checked } = event.target;
        let tempSkill = skills.map((skill) => (
            skill.name === name ? { ...skill, isChecked: checked } : skill)
        );
        setSkills(tempSkill);
    };

    const handleLevelChange = (event) => {
        const name = event.target.name;
        const index = skills.findIndex(object => {
            return object.name === name;
        });
        const level = event.target.value;
        let tempSkill = skills;
        tempSkill[index]['level_id'] = level;
        setSkills(tempSkill);
    };

    const handleCommentChange = (event) => {
        const name = event.target.name;
        const index = skills.findIndex(object => {
            return object.name === name;
        });
        const comment = event.target.value;
        let tempSkill = skills;
        tempSkill[index]['comment'] = comment;
        setSkills(tempSkill);
    };

    const validateData = () => {
        if(course !== 0){
            if (isSelTopic && topic === " "){
                setValidated(false); 
                return false;
            }else{
                setValidated(true); 
                return true;
            }
        }else{
            setValidated(false);
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateData()){
            var cleaned_skill = skills.filter(skill => skill.isChecked).slice(0);

            cleaned_skill.forEach((skill) => {
                delete skill.des;
                delete skill.isChecked;
                delete skill.levels;
                skill['skill_id'] = skill['id'];
                delete skill['id'];
                skill['skill_name'] = skill['name'];
                delete skill['name'];
            })

            var data = {
                course_id: course,
                isSelTopic: isSelTopic,
                topic: topic,
                skills: cleaned_skill
                }
            // console.log(data);        

            await axios.post(Course_URL, data)
            .then((res) => {
                console.log(res.status);
                if (res.status === 200 || res.status === 201){
                    MySwal.fire({
                        title: 'Sucess!',
                        text: 'Your achieved skills has been saved',
                        icon: 'success',
                        confirmButtonColor: '#7FCFFF',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then((result) => {
                        if (result.isConfirmed){
                            window.location.reload();
                        }
                    })
                }else{
                    MySwal.fire({
                        title: 'Something went wrong!',
                        text: `Status ${res.status} (${res.statusText})`,
                        icon: 'error',
                        confirmButtonColor: '#7FCFFF',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
            
        }else{
            MySwal.fire({
                text: `Please inform required field.`,
                icon: 'warning',
                confirmButtonColor: '#7FCFFF',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        }
        
    };

    const showInstruction = () => {
        MySwal.fire({
            title: 'Instruction',
            html: `<div class="align-left">
            1. Select course from dropdown manu.<br /> <br />
            2. Select all skills that the students will achieved from the course. <br /> <br />
            3. Select the level of skill students will achieved based on the level description or rubric. <br /> <br />
            4. If you have any suggestion on the level description, please type in the comment box under that skill. <br /> <br />
            5. If you have suggestion on additional skill provided by the course, please add via the form below save button.<br /> <br />
            </div>`,
            confirmButtonColor: '#7FCFFF',
            allowOutsideClick: false,
            allowEscapeKey: false
        })
    };


    return (
        <div>
            <div class="grid grid-flow-row auto-rows-max">
                
                <div>
                <h4 className="top-header">Add achieved skills from course</h4>
                    <div className="container">
                        <div class="bg-blue-50 rounded-lg py-2 px-6 text-base text-red-500 mb-2 hover:bg-blue-100 cursor-pointer" onClick={showInstruction}>
                        Click to read the instruction here!
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h6>
                                    Course:
                                </h6>
                                <Form.Select className="courses-dropdown" value={course} onChange={handleCourseChange} required>
                                    <option>Please select course</option>
                                    {options.map((option) => (
                                        <option value={option._id} id={option.id} >{option.id} {option.name} {option.sel_topic!=undefined? `(topic: ${option.sel_topic})`: ""}</option>
                                    ))}
                                </Form.Select> 
                                <h6>
                                    Topic for Selected Topics Course:
                                </h6>
                                
                                <input type="text" onChange={e => setTopic(e.target.value)}></input>
                            </div>
                            
                            <div>
                                <br/>
                                <h5>
                                    Skills
                                </h5>  
                                <label>Please select all skills that student will acheive in this course.</label>  
                                {skills.map((skill, index) => (
                                    <div key={index}>
                                        <input
                                        type="checkbox"
                                        name={skill.name}
                                        value={skill.name}
                                        checked={skill?.isChecked || false}
                                        onChange={handleSkillsChange}
                                        />
                                        <label>{skill.name}</label>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <br/>
                                {skills.filter(skill => skill.isChecked).map((skill, index) => (
                                    <div>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th className="name-col">Name</th>
                                                    <th className="des-col">Description </th>
                                                    {skill.levels.map((level) => (
                                                        <th className="level-col">
                                                            Level {level.level_id}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="name-col">{skill.name}</td>
                                                    <td className="des-col">{skill.des}</td>
                                                    {skill.levels.map((level) => (
                                                        <td className="level-col">
                                                            {level.level_des}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><h6>Please select level of acheieved skill</h6></td>
                                                    {skill.levels.map((level) => (
                                                        <td className="level-col">
                                                            <input type="radio" name={skill.name} id={index} value={level.level_id} onChange={handleLevelChange}></input>
                                                            <label>{level.level_id}</label>
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <div className="comment">
                                            <label>You can suggest detail of each level here.</label>
                                            <textarea className="comment-box" name={skill.name} id={index} onChange={handleCommentChange}></textarea>  
                                        </div>
                                        <br/>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button type="submit" value="Submit" className="submit-btn">save</button>     
                            </div>
                            
                        </form>
                        
                    </div>
                </div>

                <div className="container">
                    <p>If you want to suggest more skills please inform this form <a href="https://cmu.to/CPESkillMapping" target="_blank">Add additional achieved skills from course</a></p>
                </div>
            </div>

            
            
        </div>
    )
}

export default AchievedSkill;