import mongoose from 'mongoose';
import slugify from 'slugify';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    company: String,
    imageUrl: String,
    description: {
      type: String,
      required: true,
    },
    
    contactlink: {
      type: String,
      required: false,
    },
    whatsApp: {
      type: String,
      required: false,
    },
    tags: [String],
    postedAt: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    },
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

jobSchema.pre('save', async function () {
  let baseSlug = slugify(this.title, { lower: true });
  let slug = baseSlug;
  let counter = 1;

  const Job = this.constructor;

  while (await Job.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});


export default mongoose.model('Job', jobSchema);
