import CoursesModel from '../models/coursesmodel.js';
import StudentModel from '../models/studentmodent.js';
import mongoose from 'mongoose';

export const getCourses = async (req,res) =>{
    try{
        const courses = await CoursesModel.find();
        
        // const n = courses[0].skills.length;
        // console.log(courses[0].skills,n);
        
        function compare( a, b ) {
            if ( a.id < b.id ){
              return -1;
            }
            if ( a.id > b.id ){
              return 1;
            }
            return 0;
        }
          
        courses.sort( compare );
       
        res.status(200).json(courses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


export const UpdateorNew = async (req,res) =>{
    const { course_id, topic,skills,isSelTopic } = req.body;
    console.log(req.body);
    const sel_topic = topic;
    // console.log(skills[0].skill_name,skills[0].level_id);
    // console.log(skills[1].skill_name,skills[1].level_id);
    if( isSelTopic == true /*เป็นseltopic*/){
        const seltopic = await CoursesModel.find({_id : course_id});
        // console.log(seltopic);
        const Courses = new CoursesModel({ id : seltopic[0].id ,name : seltopic[0].name,sel_topic,skills})
            try {
                await Courses.save();
        
                res.status(201).json (Courses );
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
    }
    else{

        if (!mongoose.Types.ObjectId.isValid(course_id)) return res.status(404).send(`No post with id: ${course_id}`);

        const updatedCoursesSkill = { skills };

        await CoursesModel.findByIdAndUpdate(course_id, updatedCoursesSkill, { new: true });

        res.json(updatedCoursesSkill);

        //console.log(res);
    }

};

// /courses/:id(รหัสนักศึกษา)
export const restCourses = async (req,res) =>{
    const id = req.params.id;
    // console.log(id)
    try{
        const student = await StudentModel.find({student_id : id});
        const courses = await CoursesModel.find();
        // console.log(courses)
        // console.log("courses" , courses.length)
        var restcourses = courses;
        // console.log(restcourses)
        for(let i=0;i<student[0].courses.length;i++){
            for(let j=0;j<restcourses.length;j++){
                // console.log(restcourses[j]);
                if(student[0].courses[i].course_name === restcourses[j].name && student[0].courses[i].course_id === restcourses[j].id){
                    restcourses.splice(j, 1);
                }
                else if(student[0].courses[i].course_name === restcourses[j].name && student[0].courses[i].course_id === restcourses[j].id && student[0].courses[i].sel_topic === restcourses[j].sel_topic ){
                    restcourses.splice(j, 1);
                }
            }
        }
        // console.log("student" ,student[0].courses.length)
        // console.log("restcourses" , restcourses.length)

        function compare( a, b ) {
            if ( a.id < b.id ){
              return -1;
            }
            if ( a.id > b.id ){
              return 1;
            }
            return 0;
        }
          
        restcourses.sort( compare );
        // console.log(restcourses)


        res.status(200).json(restcourses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


