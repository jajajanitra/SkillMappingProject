import StudentModel from '../models/studentmodent.js';
import CoursesModel from '../models/coursesmodel.js';

// delete course
export const deleteCourse = async (req,res) =>{
    const { token,course_name,course_id } = req.body;
    // console.log(req.body);
    try{
        const deletecourse = { $pull: { courses : {course_name : course_name,course_id : course_id} } };
        await StudentModel.findOneAndUpdate({student_id : token},deletecourse,{ new: true });
        const studentafter = await StudentModel.find({student_id:token});
        
        const course = await CoursesModel.find({name : course_name,id : course_id});
        // console.log(course[0]);
        if(studentafter[0].courses.length === 0){
            for(let a = 0; a < studentafter[0].skills.length; a++){
                for(let i=0;i<course[0].skills.length;i++){
                    if(course[0].skills[i].skill_name === studentafter[0].skills[a].skill_name){
                        const editskilllevel = { $pull:{skills : studentafter[0].skills[a] } }
                        await StudentModel.findOneAndUpdate({student_id : token},editskilllevel,{ new: true });
                        const deleteskills = { $push:{skills :{_id : studentafter[0].skills[a]._id ,
                                                skill_name :studentafter[0].skills[a].skill_name,
                                                level_id : 0,
                                                skill_like : studentafter[0].skills[a].skill_like,
                                                skill_self:studentafter[0].skills[a].skill_self }} }
                        const student = await StudentModel.findOneAndUpdate({student_id : token},deleteskills,{ new: true });                    
                    };
                };
            };
            res.status(200).json("length = 0");
        }
        else{

            for(let a = 0; a < studentafter[0].skills.length; a++){
                for(let i=0;i < course[0].skills.length;i++){
                    if(course[0].skills[i].skill_name === studentafter[0].skills[a].skill_name){
                        const editskilllevel = { $pull:{skills : studentafter[0].skills[a] } }
                        await StudentModel.findOneAndUpdate({student_id : token},editskilllevel,{ new: true });
                        const deleteskills = { $push:{skills :{_id : studentafter[0].skills[a]._id ,
                                            skill_name :studentafter[0].skills[a].skill_name,
                                            level_id : 0,
                                            skill_like : studentafter[0].skills[a].skill_like,
                                            skill_self:studentafter[0].skills[a].skill_self }} }
                        await StudentModel.findOneAndUpdate({student_id : token},deleteskills,{ new: true });                    
                    };
                };
            };
            const studentfind = await StudentModel.find({student_id:token});
            for(let x=0; x < studentfind[0].courses.length; x++){
                const course = await CoursesModel.find({name : studentfind[0].courses[x].course_name,
                                                        id : studentfind[0].courses[x].course_id,
                                                        sel_topic : studentfind[0].courses[x].sel_topic
                                                    });
                // console.log(course[0]);
                for(let s=0;s<course.length;s++){
                    // console.log(course[s]);
                    for(let y=0; y < course[s].skills.length; y++){
                        const student = await StudentModel.find({student_id:token});
                        for(let i=0; i < student[0].skills.length; i++){
                            if(student[0].skills[i].skill_name === course[s].skills[y].skill_name){
                                // console.log(student[0].skills[i].level_id);
                                if(student[0].skills[i].level_id === 0){
                                    // console.log(student[0].skills[i].skill_name);
                                    const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                    await StudentModel.findOneAndUpdate({student_id:token},deleteskilllevel,{ new: true });

                                    const addskilllevel = { $push:{skills :{
                                        _id : course[s].skills[y]._id ,
                                        skill_name :course[s].skills[y].skill_name,
                                        level_id : course[s].skills[y].level_id,
                                        skill_like : student[0].skills[i].skill_like,
                                        skill_self: student[0].skills[i].skill_self }} }
                                    await StudentModel.findOneAndUpdate({student_id:token},addskilllevel,{ new: true });
                                }
                                else if(student[0].skills[i].level_id < course[s].skills[y].level_id){
                                    // console.log(student[0].skills[i].skill_name);
                                    const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                    await StudentModel.findOneAndUpdate({student_id:token},deleteskilllevel,{ new: true });

                                    const addskilllevel = { $push:{skills :{
                                        _id : course[s].skills[y]._id ,
                                        skill_name :course[s].skills[y].skill_name,
                                        level_id : course[s].skills[y].level_id,
                                        skill_like : student[0].skills[i].skill_like,
                                        skill_self: student[0].skills[i].skill_self }} }
                                    await StudentModel.findOneAndUpdate({student_id:token},addskilllevel,{ new: true });
                                }
                            }
                        }
                    }
                }
                
            }
            res.status(200).json("else");
        }
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};



//show datastudent
export const getSkillsStudent = async (req,res) =>{
    // const token = 12345;
    const  token_id  = req.params.token_id;
    try{

        const student =  await StudentModel.find({student_id : token_id});
        var level_id = [];
        var skills_name = [];
        var skill_self = [];
        for(let i=0; i<student[0].skills.length; i++){
            skills_name[i] = student[0].skills[i].skill_name;
            level_id[i] = student[0].skills[i].level_id;
            skill_self[i] =student[0].skills[i].skill_self;
        }

        var skills = [];
        skills[0] = skills_name;
        skills[1] = level_id;
        skills[2] = skill_self;
        // console.log(skills)

        var date = student[0].time_stamp;

        var obj ={
            skills,
            date
        }
        // console.log(date);
            res.status(200).json(obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};
