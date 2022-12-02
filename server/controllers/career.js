import careersModel from '../models/careermodel.js';

//show career
export const getCareer = async (req,res) =>{

    try{
        const career = await careersModel.find();
        res.status(200).json(career);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

//add new career
export const newCareer = async (req,res) =>{
    const { name ,des ,levels } = req.body;
    const careersModel = new newCareer({ name ,des ,levels})

    console.log(req.body);
    try {
        await careersModel.save();

        res.status(201).json(careersModel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//mapping with skill

