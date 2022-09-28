import React, { useState, useEffect } from "react";
import axios from "axios";
import {Table,Form} from "react-bootstrap";
import '../css/AchievedSkill.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function AchievedSkill () {
    const [course, setCourse] = useState("");
    const [options, setOptions] = useState([]);
    const [skills, setSkills] = useState([]);
    const [topic, setTopic] = useState("");
    const [isSelTopic, setIsSelTopic] = useState(false);

    const URL = "http://localhost:5001";
    const requestCourses = axios.get(URL + "/courses");
    const requestSkills = axios.get(URL + "/skills");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.all([requestCourses, requestSkills])
        .then(
            axios.spread((...responses) => {
                const responseCourses = responses[0];
                const responseSkills = responses[1];
                setOptions(responseCourses.data);
                setSkills(responseSkills.data);
              }
        ))
    };

    const handleCourseChange = (event) => {
        setCourse(event.target.value);
        if (event.target.id === 261494 || event.target.id === 261497 || event.target.id === 261498 || event.target.id === 261499){
            setIsSelTopic(true);
        }
    };

    const handleSkillsChange = (event) => {
        const { name, checked } = event.target;
        let tempSkill = skills.map((skill) => (
            skill.name === name ? { ...skill, isChecked: checked } : skill)
        );
        setSkills(tempSkill);
    };

    const handleLevelChange = (event) => {
        const index = event.target.id;
        const level = event.target.value;
        let tempSkill = skills;
        tempSkill[index]['level_id'] = level;
        setSkills(tempSkill);
    };

    const handleCommentChange = (event) => {
        const index = event.target.id;
        const comment = event.target.value;
        let tempSkill = skills;
        tempSkill[index]['comment'] = comment;
        setSkills(tempSkill);
    };

    const handleSubmit = async () => {
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
            topic: topic,
            skills: cleaned_skill
            }
        console.log(data);

        await axios.post(URL + "/courses", data)
        .then((res) => {
            console.log(res.status);
            if (res.status === 200){
                MySwal.fire({
                    title: 'Your achieved skills has been saved',
                    icon: 'success',
                    confirmButtonColor: '#7FCFFF'
                  }).then((result) => {
                    if (result.isConfirmed){
                        window.location.reload();
                    }
                  })
            }else{
                MySwal.fire({
                    title: 'Something went wrong!',
                    icon: 'error'
                  })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <div>

            <h4 className="top-header">Add achieved skills from course</h4>
            <div className="container">
                <div>
                    <h6>
                        Course:
                    </h6>
                    <Form.Select className="courses-dropdown" value={course} onChange={handleCourseChange}>
                        <option value={0} >Please select course</option>
                        {options.map((option) => (
                            <option value={option._id} id={option.id} >{option.id} {option.name}</option>
                        ))}
                    </Form.Select> 
                    <h6>
                        Topic:
                    </h6>
                    <input type="text" onChange={e => setTopic(e.target.value)}></input>
                </div>
                
                <div>
                    <br/>
                    <h5>
                        Skills
                    </h5>  
                    <label>Please select all skills that student will achive in this course.</label>  
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
                                        <td></td>
                                        <td></td>
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
                                <label>comment</label>
                                <textarea className="comment-box" name={skill.name} id={index} onChange={handleCommentChange}></textarea>  
                            </div>
                            <br/>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-btn" onClick={handleSubmit}>save</button>  
            </div>
            
        </div>
    )
}

export default AchievedSkill;