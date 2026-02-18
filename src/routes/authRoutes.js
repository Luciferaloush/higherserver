import express from 'express';
import { register, login, refresh, logout, me } from '../controllers/auth.controller.js';
import { protect , requireAdmin, requireUser} from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', protect, requireUser, me);

export default router;
