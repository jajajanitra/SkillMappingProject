import express from 'express';
import { get } from 'mongoose';

import { login } from '../controllers/oauth.js';

const router = express.Router();

router.post( '/' , login );

export default router;