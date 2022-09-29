import express from 'express';
import { get } from 'mongoose';

import { getCourses , UpdateorNew  } from '../controllers/courses.js';

const router = express.Router();

router.get( '/' , getCourses );
router.post( '/' , UpdateorNew  );

export default router;