import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
// import dotenv from 'dotenv';
// require('dotenv').config();
import * as dotenv from 'dotenv';
dotenv.config();


import coursesRouters from './routes/courses.js';
import updateCoursesSkill from './routes/courses.js';
import restCourses from './routes/courses.js';

import skillRouters from './routes/skills.js';
import newSkill from './routes/skills.js';

import getCareer from './routes/career.js';
import getCareers from './routes/career.js';

import getStudent from './routes/student.js';
import addCourses from './routes/student.js';
import addLikeskills from './routes/student.js';
import addSelfkills from './routes/student.js';
import deleteCourse from './routes/student.js';
import SkilltoCareer from './routes/student.js';
import SkillMapping from './routes/student.js';
import getSkillsStudent from './routes/student.js';

import login from './routes/oauth.js';




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/courses' ,coursesRouters ,updateCoursesSkill,restCourses);
app.use('/skills',skillRouters ,newSkill);
app.use('/career' , getCareers, getCareer );
app.use('/student' , getStudent,addCourses,addLikeskills,addSelfkills,deleteCourse,SkilltoCareer,SkillMapping,getSkillsStudent);
app.use('/login' ,login);



//const CONNECTION_URL = 'mongodb+srv://project:491@skillmapping.s8p064c.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://project:491@skillmapping.s8p064c.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5001;
}

app.listen(port, () => {
    console.log('App listening on port 5001');
})