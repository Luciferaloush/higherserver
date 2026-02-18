import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sections: {
      personal: {
        name: String,
        phone: String,
        email: String,
        location: String,
        summary: String,
      },
      education: [
        {
          school: String,
          degree: String,
          fieldOfStudy: String,
          startDate: Date,
          endDate: Date,
          description: String,
        },
      ],
      experience: [
        {
          company: String,
          position: String,
          startDate: Date,
          endDate: Date,
          description: String,
          isCurrentlyWorking: Boolean,
        },
      ],
      skills: [String],
      languages: [
        {
          language: String,
          proficiency: {
            type: String,
            enum: ['Elementary', 'Limited', 'Professional', 'Fluent', 'Native'],
          },
        },
      ],
      certifications: [
        {
          name: String,
          issuer: String,
          issueDate: Date,
          expiryDate: Date,
          credentialUrl: String,
        },
      ],
      extras: [
        {
          title: String,
          description: String,
        },
      ],
    },
    visibility: {
      type: String,
      enum: ['private', 'public'],
      default: 'private',
    },
    pdfUrl: {
      type: String,
      default: null,
    },
    pdfGeneratedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('CV', cvSchema);
