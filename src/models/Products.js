import mongoose from 'mongoose';
import slugify from 'slugify';


const productSchema = new mongoose.Schema(
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
    imageUrl: String,
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', async function (next) {
  let baseSlug = slugify(this.title, { lower: true });
  let slug = baseSlug;
  let counter = 1;

  const Product = this.constructor;

  while (await Product.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  next();
});

export default mongoose.model('Products', productSchema);
