import React, { useState, useEffect } from "react";
import '../css/AchievedSkill.css';

function AchievedSkill () {
    const [course, setCourse] = useState("");
    const [skills, setSkills] = useState([]);

    const options = [
        {label: "course1", value: "course1"},
        {label: "course2", value: "course2"}
    ];
    const skillData = [
        {name: "API", des: "API"},
        {name: "Coding", des: "Coding"}
    ];

    useEffect(() => {
        setSkills(skillData);
    }, []);
    
    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };

    const handleSkillsChange = (event) => {
        const { name, checked } = event.target;
        let tempSkill = skills.map((skill) =>
            skill.name === name ? { ...skill, isChecked: checked } : skill
        );
        setSkills(tempSkill);
    };


    return (
        <div>

            <h4 class="top-header">Add achieved skills from course</h4>
            <div>
                <label>
                    Select course:
                </label>
                <select value={course} onChange={handleCourseChange}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select> 
            </div>
            
            <div>
                <h4>Course : {course}</h4>
                <p>Please select all skills that student will achive in this course.</p>
                <label>
                    Skills
                </label>    
                {skills.map((skill, index) => (
                    <div key={index}>
                        <input
                        type="checkbox"
                        name={skill.name}
                        checked={skill?.isChecked || false}
                        onChange={handleSkillsChange}
                        />
                        <label>{skill.name}</label>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default AchievedSkill;