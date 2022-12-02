import mongoose from 'mongoose';

const careerSchema = mongoose.Schema({
    name : String,
    des : String,
    skills : [
        {
        level_id : String,
        skill_name : String,
        }
    ]
},{versionKey: false});

const careersModel = mongoose.model('careersModel',careerSchema);

export default careersModel;