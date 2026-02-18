import express from 'express';
import {
  sendPublic,
  sendDirect,
  sendSystem,
  getMyNotifications,
  readNotification,
  removeNotification,
} from '../controllers/notfication.controller.js';
import { protect, requireAdmin  } from '../middlewares/auth.js';

const router = express.Router();

// PUBLIC
router.post('/public',protect, requireAdmin , sendPublic);

// DIRECT
router.post('/direct',protect, requireAdmin , sendDirect);

// SYSTEM
router.post('/system', protect, requireAdmin ,sendSystem);

// USER ROUTES (requires auth)
router.get('/me', protect, getMyNotifications);
router.put('/read/:id', protect, readNotification);
router.delete('/:id', protect, removeNotification);

export default router;
