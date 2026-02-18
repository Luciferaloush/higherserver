import {
  createPublicNotification,
  createDirectNotification,
  createSystemNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
} from '../services/notification.service.js';
import { asyncHandler } from '../utils/errorHandler.js';

// -------- PUBLIC NOTIFICATION -------- //
export const sendPublic = asyncHandler(async (req, res) => {
  const { title, body, meta, topic } = req.body;

  const result = await createPublicNotification({ title, body, meta, topic });
  res.json({
    success: true,
    message: 'Public notification sent',
    data: result,
  });
});

// -------- DIRECT NOTIFICATION -------- //
export const sendDirect = asyncHandler(async (req, res) => {
  const { userId, title, body, meta } = req.body;

  const result = await createDirectNotification({
    userId,
    title,
    body,
    meta,
  });

  res.json({
    success: true,
    message: 'Direct notification sent to user',
    data: result,
  });
});

// -------- SYSTEM NOTIFICATION -------- //
export const sendSystem = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const result = await createSystemNotification({ title, body });

  res.json({
    success: true,
    message: 'System notification created',
    data: result,
  });
});

// -------- USER NOTIFICATIONS -------- //
export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await getUserNotifications(req.user._id);

  res.json({
    success: true,
    data: notifications,
  });
});

// -------- MARK READ -------- //
export const readNotification = asyncHandler(async (req, res) => {
  const result = await markAsRead(req.params.id, req.user._id);

  if (!result) {
    return res.status(404).json({ success: false, message: 'Notification not found' });
  }

  res.json({
    success: true,
    message: 'Marked as read',
    data: result,
  });
});

// -------- DELETE -------- //
export const removeNotification = asyncHandler(async (req, res) => {
  const result = await deleteNotification(req.params.id, req.user._id);

  if (!result) {
    return res.status(404).json({ success: false, message: 'Notification not found' });
  }

  res.json({
    success: true,
    message: 'Notification deleted',
  });
});
