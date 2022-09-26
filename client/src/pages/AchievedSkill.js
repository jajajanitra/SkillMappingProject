import React, { useState, useEffect } from "react";
import {Table} from "react-bootstrap";
import '../css/AchievedSkill.css';

function AchievedSkill () {
    const [course, setCourse] = useState("");
    const [skills, setSkills] = useState([]);

    const options = [
        {label: "course1", value: "course1"},
        {label: "course2", value: "course2"}
    ];
    const skillData = [
        {name: "API",
            des: "API des",
            levels: [
                {
                    level_id: 1,
                    level_des: "API 1"},
                {
                    level_id: 2,
                    level_des: "API 2"},
                {
                    level_id: 3,
                    level_des: "API 3"},
                {
                    level_id: 4,
                    level_des: "API 4"},
                {
                    level_id: 5,
                    level_des: "API 5"},
            ]
        },
        {name: "Coding",
            des: "Coding des",
            levels: [
                {
                    level_id: 1,
                    level_des: "Coding 1"},
                {
                    level_id: 2,
                    level_des: "Coding 2"},
                {
                    level_id: 3,
                    level_des: "Coding 3"},
                {
                    level_id: 4,
                    level_des: "Coding 4"},
                {
                    level_id: 5,
                    level_des: "Coding 5"},
            ]
        }

    ];

    useEffect(() => {
        setSkills(skillData);
    }, []);
    
    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };

    const handleSkillsChange = (event) => {
        const { name, checked } = event.target;
        let tempSkill = skills.map((skill) => (
            skill.name === name ? { ...skill, isChecked: checked } : skill)
        );
        setSkills(tempSkill);
    };

    const handleSubmit = () => {
        var data = skills.filter((skill) => (skill.isChecked));
        console.log(data);
    };

    return (
        <div>

            <h4 className="top-header">Add achieved skills from course</h4>
            <div className="container">
                <div>
                    <h6>
                        Select course:
                    </h6>
                    <select value={course} onChange={handleCourseChange}>
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select> 
                </div>
                
                <div>
                    <h4>Course : {course}</h4>
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
                    <h5>Skill level</h5>
                    {skills.filter(skill => skill.isChecked).map((skill, index) => (
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="name-col">Name</th>
                                        <th className="des-col">Description </th>
                                        {skill.levels.map((level) => (
                                            <th className="level-col">
                                                level {level.level_id}
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
                                                <input type="radio" name={index} value={level.level_id}></input>
                                                <label>{level.level_id}</label>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="comment">
                                <label>comment</label>
                                <textarea className="comment-box" name={index}></textarea>  
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