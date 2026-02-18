import { registerUser, loginUser, getCurrentUser } from '../services/auth.service.js';
import { asyncHandler } from '../utils/errorHandler.js';
import { generateAccessToken, verifyRefreshToken } from '../utils/jwt.js';

export const register = asyncHandler(async (req, res) => {
  const { username, password, fcmToken, role } = req.body;
  
  const result = await registerUser(username, password, fcmToken, role);

  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});


export const login = asyncHandler(async (req, res) => {
  const { username, password, fcmToken } = req.body;

  const result = await loginUser(username, password, fcmToken);

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  const decoded = verifyRefreshToken(refreshToken);
  const accessToken = generateAccessToken({
    id: decoded.id,
    username: decoded.username,
    role: decoded.role,
  });

  res.status(200).json({
    success: true,
    data: { accessToken },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

export const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
