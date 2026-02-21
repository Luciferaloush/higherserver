import express from 'express';
import { saveJob } from '../controllers/jobBookmark.controller.js';
import { protect , requireAdmin, requireUser} from '../middlewares/auth.js';

const router = express.Router();
router.post("/save-job", protect, requireUser,saveJob);

export default router;
