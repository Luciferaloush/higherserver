// notificationSender.service.js
import { getMessaging } from "../config/firebase.js";

export const sendNotificationToUser = async (user, title, body, meta = {}) => {
  if (!user.fcmToken) return;

  try {
    await getMessaging().send({
      token: user.fcmToken,
      notification: {
        title: title,
        body: body,
      },
      data: {
        jobId: meta.jobId ? meta.jobId.toString() : "",
        type: meta.type || "direct",
      },
    });
    console.log(`✅ Notification sent to ${user._id}`);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};
