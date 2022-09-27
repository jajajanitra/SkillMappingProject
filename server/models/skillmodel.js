import mongoose from 'mongoose';

const skillsSchema = mongoose.Schema({
    id : String,
    name : String,
    des : String,
    levels : [
        {
        level_id : String,
        level_des : String
        }
    ]
});

const SkillsModel = mongoose.model('SkillsModel',skillsSchema);

export default SkillsModel;