import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../services/products.service.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';
import { createPublicNotification } from '../services/notification.service.js';

export const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, link } = req.body;
    let imageUrl = null;

   if (req.file) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
}

    const product = await addProduct(title, description, link, imageUrl);
    
    // 📢 Send public notification to all users via topic
    await createPublicNotification({
      title: 'منتج جديد 🛍️',
      body: title,
      meta: {
        productId: product._id,
        type: 'product',
      },
      topic: 'HigherStepPublic',
    });

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
});

export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, link } = req.body;
let imageUrl = null;

if (req.file) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
}

  const product = await updateProduct(id, title, description, link, imageUrl);

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});
export const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await deleteProduct(id);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await getAllProducts();
  res.status(200).json({
    success: true,
    product,
  });
}
);

export const productById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  res.status(200).json({
    success: true,
    product,
  });
}
);