import CoursesModel from '../models/coursesmodel.js';

export const getCourses = async (req,res) =>{
    try{
        const courses = await CoursesModel.find();
        
        console.log(courses);
       
        res.status(200).json(courses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


/* export const createCourses =(req, res)=>{
    const body =req.body;

    const 
    try{
        const courses = await CoursesModel.find();
        
        console.log(courses);

        res.status(200).json(courses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
}; */
