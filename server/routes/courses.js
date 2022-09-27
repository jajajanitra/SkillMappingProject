import express from 'express';
import { get } from 'mongoose';

import { getCourses } from '../controllers/courses.js';

const router = express.Router();

router.get( '/' , getCourses );
//router.post( '/' , createCourses );

export default router;