import { verifyAccessToken } from '../utils/jwt.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized to access this route', 401);
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError('Not authorized to access this route', 401);
  }
});

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new AppError('Admin access required', 403);
  }
  next();
};

const requireUser = (req, res, next) => {
  if (req.user?.role !== 'user') {
    throw new AppError('User access required', 403);
  }
  next();
};

export { protect, requireAdmin, requireUser };
