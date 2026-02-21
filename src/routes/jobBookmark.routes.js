import express from 'express';
import { saveJob , fetchSavedJobs} from '../controllers/jobBookmark.controller.js';
import { protect , requireAdmin, requireUser} from '../middlewares/auth.js';

const router = express.Router();
router.post("/save-job", protect, requireUser,saveJob);
router.get("/bookmarks", protect, requireUser, fetchSavedJobs);

export default router;
