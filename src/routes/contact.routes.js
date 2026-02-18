import express from 'express';
import * as CONATCT from '../controllers/contact.controller.js';

import { protect, requireAdmin, requireUser } from '../middlewares/auth.js';

const router = express.Router();

// user operations
router.post('/send', protect, requireUser, CONATCT.contactMessage);

// admin operations
router.get('/get-all', protect, requireAdmin, CONATCT.allContact);

export default router;
