import mongoose from 'mongoose';

const coursesSchema = mongoose.Schema({
    id : String,
    name : String,
    des : String,
    sel_topic : String,
    levels : [
        {
        skill_id : String,
        skill_name : String,
        level_id : String
        }
    ]
});

const CoursesModel = mongoose.model('CoursesModel',coursesSchema);

export default CoursesModel;