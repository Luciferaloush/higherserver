import express from 'express';
import {
  createRequest,
  getAllRequests,
  getRequest,
  getUserRequests,
  updateRequest,
  deleteRequest,
} from '../controllers/cvDesginRequest.controller.js';

import { protect, requireAdmin, requireUser } from '../middlewares/auth.js';

const router = express.Router();

// user operations
router.post('/create-request', protect, requireUser, createRequest);
router.get('/my', protect, requireUser, getUserRequests);

// admin operations
router.get('/get-all-request', protect, requireAdmin, getAllRequests);
router.get('/get-request/:id', protect, requireAdmin, getRequest);
router.put('/update-request/:id', protect, requireAdmin, updateRequest);
router.delete('/delete-request/:id', protect, requireAdmin, deleteRequest);

export default router;
