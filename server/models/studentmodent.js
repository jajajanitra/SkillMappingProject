import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    token : String,
    student_name : String,
    student_id : String,
    courses : [
        {
        course_name : String,
        course_id : String,
        }
    ],
    skills : [
        {
        skill_name : String,
        level_id : String,
        }
    ]
},{versionKey: false});

const StudentModel = mongoose.model('StudentModel',studentSchema);


export default StudentModel;