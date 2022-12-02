import express from 'express';
import { get } from 'mongoose';

import { getStudent } from '../controllers/student.js';

const router = express.Router();

router.get( '/' , getStudent);
// router.post( '/',newSkill)

export default router;