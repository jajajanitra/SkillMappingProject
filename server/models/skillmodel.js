import mongoose from 'mongoose';

const skillsSchema = mongoose.Schema({
    name : String,
    des : String,
    levels : [
        {
        level_id : String,
        level_des : String
        }
    ]
},{versionKey: false});

const SkillsModel = mongoose.model('SkillsModel',skillsSchema);


export default SkillsModel;