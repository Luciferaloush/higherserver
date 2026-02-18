import mongoose from 'mongoose';

const volunteerSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    resumeUrl: String,
    processed: {
      type: Boolean,
      default: false,
    },
    notes: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('VolunteerSubmission', volunteerSubmissionSchema);
