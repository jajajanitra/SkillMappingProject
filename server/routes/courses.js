import express from 'express';
import { get } from 'mongoose';

import { getCourses , UpdateorNew , restCourses } from '../controllers/courses.js';

const router = express.Router();

router.get( '/' , getCourses );
router.post( '/' , UpdateorNew  );
router.get( '/:id',restCourses);

export default router;