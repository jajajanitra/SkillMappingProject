import CoursesModel from '../models/coursesmodel.js';

export const getCourses = async (req,res) =>{
    try{
        const courses = await CoursesModel.find();
        
        //console.log(courses);
       
        res.status(200).json(courses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


export const updateCoursesSkill = async (req, res)=>{
    
    const { id,skills } = req.body;

    console.log(id);
    console.log(skills);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedCoursesSkill = { skills };

    await PostMessage.findByIdAndUpdate(id, updatedCoursesSkill, { new: true });

    res.json(updateCoursesSkill);

    console.log(res);
    
}; 


/*export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}*/
