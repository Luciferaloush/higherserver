import mongoose from "mongoose";

const termsSchema = new mongoose.Schema(
  {
    title: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },

    content: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },

    version: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Terms", termsSchema);
