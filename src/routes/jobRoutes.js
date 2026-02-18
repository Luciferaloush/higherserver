import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { createJob, editJob, getJob, getJobById, removeJob,removeAllJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post('/add-job', upload.single('image'), createJob);

router.put('/update-job/:id', upload.single('image'), editJob);

router.delete('/delete-job/:id', removeJob);
router.delete('/delete-all-jobs', removeAllJob);

router.get('/get-all-job', getJob);

router.get('/get-job-by-id/:id', getJobById);

export default router;
