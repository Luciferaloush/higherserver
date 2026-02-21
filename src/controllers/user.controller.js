import User from '../models/User.js';
import CV from '../models/Cv.js';
import { asyncHandler } from '../utils/errorHandler.js';

export const getMyProfileWithCV = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select('-passwordHash');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const cvs = await CV.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: {
      user,
      cvs,
    },
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.',
    });
  }

  const users = await User.aggregate([
    {
      $lookup: {
        from: 'cvs',
        localField: '_id',
        foreignField: 'userId',
        as: 'cvs',
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});