import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import getCourses from './routes/courses.js';
import getSkills from './routes/skills.js';
import updateCoursesSkill from './routes/courses.js';
// add new skill
import newSkill from './routes/skills.js';
import getCareer from './routes/career.js';
// add new career
import newCareer from './routes/career.js';
import getStudent from './routes/student.js';
// add course for student
import addCourses from './routes/student.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/courses' ,getCourses ,updateCoursesSkill);
app.use('/skills',getSkills ,newSkill);
app.use('/career' , getCareer ,newCareer);
app.use('/student' , getStudent, addCourses);


//const CONNECTION_URL = 'mongodb+srv://project:491@skillmapping.s8p064c.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://project:491@skillmapping.s8p064c.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5001;
}

app.listen(port, () => {
    console.log('App listening on port 5001');
})