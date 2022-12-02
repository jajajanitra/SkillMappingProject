import StudentModel from '../models/studentmodent.js';

//show datastudent
export const getStudent = async (req,res) =>{
    const {token} = req.body;
    try{
        const student = await StudentModel.find(token);
        res.status(200).json(student);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

//add courses
export const addCourses = async (req,res) =>{
    const { student_id,courses} = req.body;
    console.log(req.body);
    if (!mongoose.Types.ObjectId.isValid(student_id)) return res.status(404).send(`No post with id: ${student_id}`);

        const addCourses = { courses };

        await CoursesModel.findByIdAndUpdate(course_id, addCourses, { new: true });

        res.json(addCourses);

    

}

