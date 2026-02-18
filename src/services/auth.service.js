import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { AppError } from '../utils/errorHandler.js';

export const registerUser = async (username, password, fcmToken, role = 'user') => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new AppError('username already in use', 400);
  }
  const user = await User.create({
    username,
    fcmToken,
    passwordHash: password,
    role,
  });

  const accessToken = generateAccessToken({ id: user._id, username: user.username, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, username: user.username, role: user.role });

  return {
    user: {
      id: user._id,
      username: user.username,
      fcmToken: user.fcmToken,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (username, password, fcmToken) => {
  if (!username || !password || !fcmToken) {
    throw new AppError('Username, fcmToken and password are required', 400);
  }

  const user = await User.findOne({ username }).select('+passwordHash');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const accessToken = generateAccessToken({ id: user._id, username: user.username, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, username: user.username, role: user.role });

  return {
    user: {
      id: user._id,
      username: user.username,
      fcmToken: user.fcmToken,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};
export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
