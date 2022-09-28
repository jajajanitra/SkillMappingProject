import express from 'express';
import { get } from 'mongoose';

import { getSkills,newSkill } from '../controllers/skills.js';

const router = express.Router();

router.get( '/' , getSkills);
router.post( '/',newSkill)

export default router;