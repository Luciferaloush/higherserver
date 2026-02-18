import Article from '../models/Article.js';
import { AppError } from '../utils/errorHandler.js';
import fs from 'fs';
import path from 'path'

export const addArticle = async(title, content, imageUrl) => {
          if (!title || !content ) {
              throw new AppError('title or content  required', 400);
            }
          const article = await Article.create({
              title,
              content,
              imageUrl,
          })

          return article;
}

export const updateArtice = async(id, title, content, imageUrl) => {
    const article = await Article.findById(id);
    if(!article){
        throw new AppError("Article not found", 404)
    }
    if(imageUrl && article.imageUrl){
          const oldPath = path.json(process.cwd, article.imageUrl);
          if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    article.title = title ?? article.title;
  article.content = content ?? article.content;
  article.imageUrl = imageUrl ?? article.imageUrl;

  await article.save();
  return article;
}

export const deleteArticle = async (id) => {
  const article = await Article.findById(id);
  if (!article) throw new AppError('Article not found', 404);

  if (article.imageUrl) {
    const imgPath = path.join(process.cwd(), article.imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await article.deleteOne();
  return true;
};

export const getAllArticle = async () => {
  try {
    const article = await Article.find().sort({ createdAt: -1 });
    return article;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const article = await Article.findById(id);
    if (!article) throw new AppError('Article not found', 404);
    return article;
  } catch (error) {
    console.error(error);
    throw error;
  }
};