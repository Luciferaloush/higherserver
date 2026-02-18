import mongoose from 'mongoose';

const adSlotSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    active: {
      type: Boolean,
      default: false,
    },
    adCode: {
      type: String,
      default: null,
    },
    allowedPages: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Slot', adSlotSchema);
