import CoursesModel from '../models/coursesmodel.js';
import mongoose from 'mongoose';


// show courses
export const getCourses = async (req,res) =>{
    try{
        // const id = "261434";
        const courses = await CoursesModel.find();
        //console.log(courses);
       
        res.status(200).json(courses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

// // show some courses
// export const getCourses = async (req,res) =>{
//     try{
//         // const id = "261434";
//         const courses = await CoursesModel.find({id :"261200"});
//         console.log(courses[0].skills);
//         //console.log(courses);
       
//         res.status(200).json(courses);
//     } catch(error){
//         res.status(404).json( {message: error.message });
//     }
// };
// update skills and new selected topic 
export const UpdateorNew = async (req,res) =>{
    const { course_id, topic,skills,isSelTopic } = req.body;
    const sel_topic = topic;
    console.log(req.body);

    if( isSelTopic == true /*เป็นseltopic*/){
        if(course_id == '6335309e1145d8b493deb6a3' ){
            const Courses = new CoursesModel({ id : "261498",name : "Selected Topics in Computer Networks" , sel_topic,skills})
            try {
                await Courses.save();
        
                res.status(201).json (Courses );
            } catch (error) {
                res.status(409).json({ message: error.message });
            }

        }
        else if(course_id == '633531851145d8b493deb6a4' ){
            const Courses = new CoursesModel({ id : "261497",name : "Selected Topics in Computer Software" , sel_topic,skills})
            try {
                await Courses.save();
        
                res.status(201).json (Courses );
            } catch (error) {
                res.status(409).json({ message: error.message });
            }

        }
    }
    else{


        if (!mongoose.Types.ObjectId.isValid(course_id)) return res.status(404).send(`No post with id: ${course_id}`);

        const updatedCoursesSkill = { skills };

        await CoursesModel.findByIdAndUpdate(course_id, updatedCoursesSkill, { new: true });

        res.json(updatedCoursesSkill);
    }

}