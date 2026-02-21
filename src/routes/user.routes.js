import express from 'express';
import { getMyProfileWithCV, getAllUsers } from '../controllers/user.controller.js';
import { protect,  requireAdmin} from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', protect, getMyProfileWithCV);
router.get('/all-user', protect, requireAdmin, getAllUsers);

export default router;