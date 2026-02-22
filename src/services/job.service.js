import Job from '../models/Job.js';
import { AppError } from '../utils/errorHandler.js';
import fs from 'fs';
import path from 'path'
// const normalizeTags = (tags) => {
//   if (!tags) return [];
//   if (Array.isArray(tags)) return tags;
  
//   try {
//     return JSON.parse(tags); 
//   } catch {
//     return tags.split(',').map(t => t.trim());
//   }
// };
const normalizeTags = (tags) => {
  if (!tags) return [];

  // إذا Array
  if (Array.isArray(tags)) {
    return tags
      .flatMap(t => t.split(',')) // يفصل حتى لو داخل array
      .map(t => t.trim())
      .filter(Boolean);
  }

  // إذا String
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) {
        return parsed
          .flatMap(t => t.split(','))
          .map(t => t.trim())
          .filter(Boolean);
      }
    } catch {}

    return tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
  }

  return [];
};

export const addJob = async(title, description, imageUrl, tags, contactlink, whatsApp) => {
          if (!title || !description ) {
              throw new AppError('name or description or description required', 400);
            }
          const job = await Job.create({
              title,
              description,
              imageUrl,
              tags: normalizeTags(tags),
              contactlink,
              whatsApp
          })

          return job;
}

export const updateJob = async(id, title, description, imageUrl, tags, contactlink, whatsApp) => {
    const job = await Job.findById(id);
    if(!job){
        throw new AppError("Job not found", 404)
    }
    if(imageUrl && job.imageUrl){
          const oldPath = path.join(process.cwd(), job.imageUrl);
          if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    job.title = title ?? job.title;
  job.description = description ?? job.description;
  job.imageUrl = imageUrl ?? job.imageUrl;
  job.contactlink = contactlink ?? job.contactlink;
  job.whatsApp = whatsApp ?? job.whatsApp;
    if (tags) job.tags = normalizeTags(tags);

  await job.save();
  return job;
}

export const deleteJob = async (id) => {
  const job = await Job.findById(id);
  if (!job) throw new AppError('Job not found', 404);

  // حذف الصورة من uploads إذا موجودة
  if (job.imageUrl) {
    const imgPath = path.join(process.cwd(), job.imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await job.deleteOne();
  return true;
};
export const deleteAllJob = async (id) => {
  const job = await Job.find({});
  for (const j of job) {
    if (j.imageUrl) {
      const imgPath = path.join(process.cwd(), j.imageUrl);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
  }

  await Job.deleteMany({});
  return true;
};

export const getAllJobs = async () => {
  try {
    const job = await Job.find().sort({ createdAt: -1 });
    return job;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getJobsById = async (id) => {
  try {
    const job = await Job.findById(id);
    if (!job) throw new AppError('Job not found', 404);
    return job;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const searchJobs = async ({
  keyword,
  tags,
  company,
  page = 1,
  limit = 10,
}) => {
  const query = {
    active: true,
  };

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { company: { $regex: keyword, $options: "i" } },
    ];
  }

  if (tags) {
    const tagsArray = Array.isArray(tags)
      ? tags
      : tags.split(",").map((t) => t.trim());

    query.tags = { $in: tagsArray };
  }

  if (company) {
    query.company = { $regex: company, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Job.countDocuments(query);

  return {
    jobs,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};
