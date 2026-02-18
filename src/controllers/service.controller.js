import { addService, updateService, deleteService, getAllServices, getServicesById} from '../services/service.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';
import { createPublicNotification } from '../services/notification.service.js';

export const createService = asyncHandler(async (req, res, next) => {
  try {
    const { name, description } = req.body;
    let imageUrl = null;

   if (req.file) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
}


    const service = await addService(name, description, imageUrl);
    
    // 📢 Send public notification to all users via topic
    await createPublicNotification({
      title: 'خدمة جديدة 🎯',
      body: name,
      meta: {
        serviceId: service._id,
        type: 'service',
      },
      topic: 'HigherStepPublic',
    });

    res.status(200).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
});

export const editService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
let imageUrl = null;

if (req.file) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
}

  const service = await updateService(id, name, description, imageUrl);

  res.status(200).json({
    success: true,
    message: 'Service updated successfully',
    data: service,
  });
});
export const removeService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await deleteService(id);

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});

export const getService = asyncHandler(async (req, res) => {
  const services = await getAllServices();
  res.status(200).json({
    success: true,
    services,
  });
}
);

export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await getServicesById(id);
  res.status(200).json({
    success: true,
    service,
  });
}
);