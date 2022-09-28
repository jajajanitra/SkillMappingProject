import SkillsModel from '../models/skillmodel.js';


export const getSkills = async (req,res) =>{

    try{
        const skills = await SkillsModel.find();
        
        //console.log(skills);
       
        res.status(200).json(skills);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};



