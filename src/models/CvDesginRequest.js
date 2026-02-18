import mongoose from 'mongoose';

const cvDesignRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CV',
      required: true,
    },
    message: String,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('CVDesignRequest', cvDesignRequestSchema);
