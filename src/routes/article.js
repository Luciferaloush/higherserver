import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { articleById, createArticle, editArticle, getArticle, removeArticle } from '../controllers/article.controller.js';

const router = express.Router();

router.post('/add-article', upload.single('image'), createArticle);

router.put('/update-article/:id', upload.single('image'), editArticle);

router.delete('/delete-article/:id', removeArticle);

router.get('/get-all-articles', getArticle);

router.get('/get-article-by-id/:id', articleById);

export default router;