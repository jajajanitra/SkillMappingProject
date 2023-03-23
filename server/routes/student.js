import express from 'express';
import { get } from 'mongoose';

import { getStudent,addCourses,addLikeskills,addSelfkills } from '../controllers/student.js';
import { deleteCourse , getSkillsStudent} from '../controllers/student1.js';

import { SkillMapping } from '../controllers/mapping.js';
const router = express.Router();

// router.get( '/' , getStudent);
router.get( '/:token' , getStudent);
router.post( '/courses',addCourses);
router.post( '/likes',addLikeskills);
router.post( '/selfs',addSelfkills);
router.post( '/delete',deleteCourse);
router.get( '/mapping/:token',SkillMapping);
router.get( '/skills/:token_id',getSkillsStudent);



export default router;