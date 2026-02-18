import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // المستخدم في حال كان الإشعار مباشر
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    // معلومات مرتبطة بالاشعار (وظيفة - مقالة...)
    meta: {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        default: null,
      },
      articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        default: null,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        default: null,
      },
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        default: null,
      },
      type: {
        type: String,
        enum: ["job", "article", "product", "service", "system"],
      },
    },

    // هل تمت قراءته من قبل المستخدم
    read: {
      type: Boolean,
      default: false,
    },

    // نوع الإشعار
    notificationType: {
      type: String,
      enum: ["public", "direct", "system"], // أفضل من fcmtopic
      required: true,
    },

    // topic المستخدم للإشعارات العامة
    topic: {
      type: String,
      default: null,
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
