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

export const newSkill = async (req,res) =>{
    const { id ,name ,des ,levels : [{level_id, level_des } ]} = req.body;
    const SkillsModel = new SkillsModel({ id ,name ,des ,levels : [{level_id, level_des } ] })

    try {
        await SkillsModel.save();

        res.status(201).json(SkillsModel );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


