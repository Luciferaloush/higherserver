import Service from '../models/ServiceModel.js';
import { AppError } from '../utils/errorHandler.js';
import fs from 'fs';
import path from 'path'
export const addService = async(name, description, imageUrl) => {
          if (!name || !description || !description) {
              throw new AppError('name or description or description required', 400);
            }
          const service = await Service.create({
              name,
              description,
              imageUrl
          })

          return service;
}

export const updateService = async(id, name, description, imageUrl) => {
    const service = await Service.findById(id);
    if(!service){
        throw new AppError("Service not found", 404)
    }
    if(imageUrl && service.imageUrl){
          const oldPath = path.json(process.cwd, service.imageUrl);
          if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    service.name = name ?? service.name;
  service.description = description ?? service.description;
  service.imageUrl = imageUrl ?? service.imageUrl;
  await service.save();
  return service;
}

export const deleteService = async (id) => {
  const service = await Service.findById(id);
  if (!service) throw new AppError('Service not found', 404);

  // حذف الصورة من uploads إذا موجودة
  if (service.imageUrl) {
    const imgPath = path.join(process.cwd(), service.imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await service.deleteOne();
  return true;
};

export const getAllServices = async () => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getServicesById = async (id) => {
  try {
    const service = await Service.findById(id);
    if (!service) throw new AppError('Service not found', 404);
    return service;
  } catch (error) {
    console.error(error);
    throw error;
  }
};