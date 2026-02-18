import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { createProduct, editProduct, productById, getProduct, removeProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/add-product', upload.single('image'), createProduct);

router.put('/update-product/:id', upload.single('image'), editProduct);

router.delete('/delete-product/:id', removeProduct);

router.get('/get-all-product', getProduct);

router.get('/get-product-by-id/:id', productById);

export default router;