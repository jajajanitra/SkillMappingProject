import express from 'express';
import { get } from 'mongoose';

import { getStudent ,addCourses} from '../controllers/student.js';

const router = express.Router();

router.get( '/' , getStudent);
router.post( '/',addCourses)

export default router;