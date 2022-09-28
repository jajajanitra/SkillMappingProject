import express from 'express';
import { get } from 'mongoose';

import { getCourses , updateCoursesSkill } from '../controllers/courses.js';

const router = express.Router();

router.get( '/' , getCourses );
router.post( '/' , updateCoursesSkill );

export default router;