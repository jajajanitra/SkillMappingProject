import CoursesModel from '../models/coursesmodel.js';
import mongoose from 'mongoose';

export const getCourses = async (req,res) =>{
    try{
        const courses = await CoursesModel.find();
        
        //console.log(courses);
       
        res.status(200).json(courses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


// export const updateCoursesSkill = async (req, res)=>{
    
//     const { course_id,skills } = req.body;

//     console.log(req.body);
//     console.log(skills);

//     if (!mongoose.Types.ObjectId.isValid(course_id)) return res.status(404).send(`No post with id: ${course_id}`);

//     const updatedCoursesSkill = { skills };

//     await CoursesModel.findByIdAndUpdate(course_id, updatedCoursesSkill, { new: true });

//     res.json(updateCoursesSkill);

//     console.log(res);
    
// }; 


// export const newSelTopic = async (req,res) =>{
//     const { id,name ,des , sel_topic,levels } = req.body;
//     const SkillModel = new CoursesModel({ id,name ,des , sel_topic,levels})

//     console.log(req.body);
//     try {
//         await CoursesModel.save();

//         res.status(201).json(SkillModel );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }


export const UpdateorNew = async (req,res) =>{
    const { course_id, sel_topic,skills,isSelTopic } = req.body;

    if( isSelTopic == true /*เป็นseltopic*/){
        // const { id,name ,des , sel_topic,levels } = req.body;
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

        //const Courses = new CoursesModel({ id,name ,des , sel_topic,skills})
        
        //console.log(req.body);            
        // try {
        //     await Courses.save();
    
        //     res.status(201).json (Courses );
        // } catch (error) {
        //     res.status(409).json({ message: error.message });
        // }
    }
    else{
        // const { course_id,skills } = req.body;

        //console.log(req.body);
        //console.log(skills);

        if (!mongoose.Types.ObjectId.isValid(course_id)) return res.status(404).send(`No post with id: ${course_id}`);

        const updatedCoursesSkill = { skills };

        await CoursesModel.findByIdAndUpdate(course_id, updatedCoursesSkill, { new: true });

        res.json(updatedCoursesSkill);

        //console.log(res);
    }

}