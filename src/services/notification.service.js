import Notification from "../models/Notfication.js";
import { getMessaging } from '../config/firebase.js';

export const createPublicNotification = async ({
  title,
  body,
  meta = {},
  topic,
}) => {
  try {
    const messaging = getMessaging(); 

    await messaging.send({
  topic,
  data: {
    title,
    body,
    meta: JSON.stringify(meta),
    type: 'public',
  },
});


    return await Notification.create({
      title,
      body,
      meta,
      topic,
      notificationType: "public",
    });

  } catch (error) {
    console.error("❌ FCM Topic Error:", error);
    throw error;
  }
};




// -------- CREATE DIRECT NOTIFICATION -------- //
export const createDirectNotification = async ({
  userId,
  title,
  body,
  meta = {},
}) => {
  return await Notification.create({
    userId,
    title,
    body,
    meta,
    notificationType: "direct",
  });
};

// -------- CREATE SYSTEM NOTIFICATION -------- //
export const createSystemNotification = async ({ title, body }) => {
  return await Notification.create({
    title,
    body,
    notificationType: "system",
  });
};

// -------- GET USER NOTIFICATIONS -------- //
export const getUserNotifications = async (userId) => {
  return await Notification.find({
    $or: [
      { userId: userId }, // direct notifications
      { userId: null, notificationType: "system" }, // system notifications
      { userId: null, notificationType: "public" }, // public notifications
    ],
  })
    .populate("userId", "username profileImage")
    .sort({ createdAt: -1 });
};

// -------- MARK AS READ -------- //
export const markAsRead = async (notificationId, userId) => {
  // Check if it's a direct notification or system/public
  return await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      $or: [
        { userId: userId }, // direct notification
        { userId: null }, // system or public notification
      ],
    },
    { read: true },
    { new: true },
  );
};

// -------- DELETE NOTIFICATION -------- //
export const deleteNotification = async (notificationId, userId) => {
  // Check if it's a direct notification or system/public
  return await Notification.findOneAndDelete({
    _id: notificationId,
    $or: [
      { userId: userId }, // direct notification
      { userId: null }, // system or public notification
    ],
  });
};

// -------- GET NOTIFICATIONS BY TOPIC -------- //
export const getNotificationsByTopic = async (topic) => {
  return await Notification.find({
    topic,
    notificationType: "public",
  }).sort({ createdAt: -1 });
};
