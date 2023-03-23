import careersModel from '../models/careermodel.js';
import StudentModel from '../models/studentmodent.js';
import CoursesModel from '../models/coursesmodel.js';
import SkillsModel  from '../models/skillmodel.js'

//show career
export const getCareers = async (req,res) =>{

    try{
        const career = await careersModel.find();

        function compare( a, b ) {
            if ( a.name_career < b.name_career ){
              return -1;
            }
            if ( a.name_career > b.name_career ){
              return 1;
            }
            return 0;
        }
          
        career.sort( compare );
        res.status(200).json(career);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


export const getCareer = async (req,res) =>{
    const token = req.params.token;
    const id  = req.params.id;

    try{
        const student = await StudentModel.find({student_id:token});
        const career = await careersModel.find({_id : id});
        const course = await CoursesModel.find();
        const skill = await SkillsModel.find();

        var skills =[];
        //des
        for(let i = 0;i< career[0].skills.length;i++){
            for(let j=0; j< skill.length; j++){
                if(skill[j].name === career[0].skills[i].skill_name){
                    for(let n=0;n<skill[j].levels.length;n++){
                        if(skill[j].levels[n].level_id === career[0].skills[i].level_id){
                            skills[i] = {
                                skill_name : career[0].skills[i].skill_name,
                                des : skill[j].des,
                                des_thai : skill[j].des_thai,
                                level_id : career[0].skills[i].level_id,
                                des_level : skill[j].levels[n].level_des,
                                thai_level : skill[j].levels[n].level_thai
                            }
                        }
                    }
                }
            }
        }
        career[0] = {
            _id : career[0]._id,
            name_career : career[0].name_career,
            des : career[0].des,
            des_thai : career[0].des_thai,
            skills
        }

        //data chart
        var chart =[3];
        var skillname = [];
        var studentlevel = [];
        var careerlevel = [];
        var studentself = [];
        const n = student[0].skills.length;
        const m = career[0].skills.length;
        for(let i = 0; i < n ; i++){
            for(let j = 0; j < m ; j++){
                if(student[0].skills[i].skill_name === career[0].skills[j].skill_name ){
                        skillname[j] = career[0].skills[j].skill_name;
                        studentlevel[j] = student[0].skills[i].level_id;
                        careerlevel[j] = career[0].skills[j].level_id;
                        studentself[j] = student[0].skills[i].skill_self;
                    if(studentlevel[j] === undefined){
                        studentlevel[j] = 0;
                    } 
                }
            };
        };

        var coursecheck = [];
        var coursetest = [];
        for(let i=0; i< CoursesModel.find(); i++){
            coursetest.push(false);
        };
        if(student[0].courses.length === 0){
            for(let i = 0; i < course.length ;i++){
                for(let m=0;m < course[i].skills.length ;m++){
                    for(let n =0;n < career[0].skills.length;n++){
                        if(course[i].skills[m].skill_name === career[0].skills[n].skill_name){
                            if(course[i].skills[m].level_id > career[0].skills[n].level_id){
                                coursecheck[i] = {
                                        id : course[i].id,
                                        name :  course[i].name,
                                        sel_topic : course[i].sel_topic,
                                };
                            };
                        };
                    };
                };
            };
        }
        else {
            for(let i = 0; i < course.length ;i++){
                for(let j = 0; j < student[0].courses.length ;j++){
                    if(course[i].name !== student[0].courses[j].course_name){
                        for(let m=0;m < course[i].skills.length ;m++){
                            for(let n =0;n < career[0].skills.length;n++){
                                for(let x=0;x < student[0].skills.length;x++){
                                    if(course[i].skills[m].skill_name === career[0].skills[n].skill_name && career[0].skills[n].skill_name === student[0].skills[x].skill_name){
                                        if(career[0].skills[n].level_id > student[0].skills[x].level_id ){
                                            if(course[i].skills[m].level_id > student[0].skills[x].level_id){
                                                coursecheck[i] = {
                                                    id : course[i].id,
                                                    name :  course[i].name,
                                                    sel_topic : course[i].sel_topic,
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    }
                };
            };
        }

        //แนะนำวิชา
        var courses = [];
        let x = 0;
        for(let i=0;i<coursecheck.length;i++){
            if(coursecheck[i] !== undefined){
                courses[x] = coursecheck[i];
                x++;
            };
        };
        for(let i =0;i<student[0].courses.length;i++){
            for(let j=0;j< courses.length;j++){
                if(courses[j].name === student[0].courses[i].course_name){
                    courses.splice(j, 1);
                };
            };
        };

        chart[0] = skillname;
        chart[1] = studentlevel;
        chart[3] = careerlevel;
        chart[2] = studentself;
        var obj = {
            career,
            // skills,
            chart,
            courses
        };
        // console.log(obj);
        res.status(200).json(obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

