import express from 'express';
import { getMyProfileWithCV } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', protect, getMyProfileWithCV);

export default router;