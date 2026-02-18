import Product from '../models/Products.js';
import { AppError } from '../utils/errorHandler.js';
import fs from 'fs';
import path from 'path'

export const addProduct = async(title, description, link, imageUrl) => {
          if (!title || !description || !link) {
              throw new AppError('title, description and link are required', 400);
            }
          const product = await Product.create({
              title,
              description,
              link,
              imageUrl,
          })
          return product;
}


export const updateProduct = async(id, title, description, link, imageUrl) => {
    const product = await Product.findById(id);
    if(!product){
        throw new AppError("Product not found", 404)
    }
    if(imageUrl && product.imageUrl){
          const oldPath = path.join(process.cwd(), product.imageUrl);
          if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    product.title = title ?? product.title;
  product.description = description ?? product.description;
  product.link = link ?? product.link;
  product.imageUrl = imageUrl ?? product.imageUrl;

  await product.save();
  return product;
}

export const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError('Product not found', 404);

  if (product.imageUrl) {
    const imgPath = path.join(process.cwd(), product.imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await product.deleteOne();
  return true;
};

export const getAllProducts = async () => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new AppError('Product not found', 404);
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};