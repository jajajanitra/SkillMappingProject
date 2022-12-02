import express from 'express';
import { get } from 'mongoose';

import { getCareer,newCareer } from '../controllers/career.js';

const router = express.Router();

router.get( '/' , getCareer );
router.post('/', newCareer);

export default router;