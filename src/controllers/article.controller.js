import { addArticle, deleteArticle, getAllArticle, getArticleById, updateArtice } from '../services/article.service.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';
import { createPublicNotification } from '../services/notification.service.js';

export const createArticle = asyncHandler(async (req, res) => {

  const { title, content } = req.body;
  let imageUrl = null;

  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
  }

  if (!title || !content) {
    throw new AppError('Title and content are required', 400);
  }

  const article = await addArticle(title, content, imageUrl);

  await createPublicNotification({
    title: 'مقالة جديدة 📰',
    body: title,
    meta: {
      articleId: article._id,
      type: 'article',
    },
    topic: 'HigherStepPublic',
  });

  res.status(201).json({
    success: true,
    message: 'Article created successfully',
    data: article,
  });

});


export const editArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
let imageUrl = null;

if (req.file) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
}

  const article = await updateArtice(id, title, content, imageUrl);

  res.status(200).json({
    success: true,
    message: 'Article updated successfully',
    data: article,
  });
});
export const removeArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await deleteArticle(id);

  res.status(200).json({
    success: true,
    message: 'Article deleted successfully',
  });
});

export const getArticle = asyncHandler(async (req, res) => {
  const article = await getAllArticle();
  res.status(200).json({
    success: true,
    article,
  });
}
);

export const articleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await getArticleById(id);
  res.status(200).json({
    success: true,
    article,
  });
}
);