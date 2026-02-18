import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { createService, editService, removeService, getService, getServiceById} from '../controllers/service.controller.js';

const router = express.Router();

router.post('/add-services', upload.single('image'), createService);

router.put('/update-services/:id', upload.single('image'), editService);

router.delete('/delete-services/:id', removeService);

router.get('/get-all-services', getService);

router.get('/get-service-by-id/:id', getServiceById);

export default router;
