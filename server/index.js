import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import coursesRouters from './routes/courses.js';
import skillRouters from './routes/skills.js';
import updateCoursesSkill from './routes/courses.js';
import newSkill from './routes/skills.js';
import getCareer from './routes/career.js';
import newCareer from './routes/career.js';
import getStudent from './routes/student.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/courses' ,coursesRouters ,updateCoursesSkill);
app.use('/skills',skillRouters ,newSkill);
app.use('/career' , getCareer ,newCareer);
app.use('/student' , getStudent);


//const CONNECTION_URL = 'mongodb+srv://project:491@skillmapping.s8p064c.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://project:491@skillmapping.s8p064c.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5001;
}

app.listen(port, () => {
    console.log('App listening on port 5001');
})