import {
  addJob,
  updateJob,
  deleteJob,
  deleteAllJob,
  getJobsById,
  getAllJobs,
  searchJobs
} from "../services/job.service.js";
import { AppError, asyncHandler } from "../utils/errorHandler.js";

import { matchJobWithCVs } from "../services/jobMatcher.service.js";
import { getMessaging } from "../config/firebase.js";
import { createDirectNotification } from "../services/notification.service.js";

export const createJob = asyncHandler(async (req, res) => {
  const { title, description, tags, contactlink, whatsApp } = req.body;

 let imageUrl = null;

  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
  }

  const job = await addJob(title, description, imageUrl, tags, contactlink, whatsApp);


  // 🔥 MATCH CVS
  const matchedUsers = await matchJobWithCVs(job);

  for (const { user } of matchedUsers) {
    // Save notification to database
    await createDirectNotification({
      userId: user._id,
      title: "وظيفة مناسبة لسيرتك الذاتية 💼",
      body: `تم نشر وظيفة "${job.title}" قد تهمك`,
      meta: {
        jobId: job._id,
        type: "job",
      },
    });

    // Send FCM notification if user has FCM token
    if (user.fcmToken) {
      if (user.fcmToken) {
  await getMessaging().send({
    token: user.fcmToken,
    notification: {
      title: "وظيفة جديدة مناسبة لك 💼",
      body: `تم نشر وظيفة "${job.title}" قد تهمك`,
    },
    data: {
      jobId: job._id.toString(),
      type: "job",
      title: "وظيفة جديدة مناسبة لك 💼",  // مهم للـ data-only fallback
      body: `تم نشر وظيفة "${job.title}" قد تهمك`, // مهم للـ data-only fallback
    },
  });
}

    }
  }

  res.status(201).json({
    success: true,
    message: "Job created & notifications sent",
    job,
  });
});

export const editJob = asyncHandler(async (req, res,) => {
    const { title, description, tags, contactlink, whatsApp } = req.body;

    let imageUrl = null;
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const job = await updateJob(
      req.params.id,
      title,
      description,
      imageUrl,
      tags,
      contactlink,
      whatsApp
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
 
});
export const removeJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await deleteJob(id);

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});
export const removeAllJob = asyncHandler(async (req, res) => {

  await deleteAllJob(); 

  res.status(200).json({
    success: true,
    message: "All jobs deleted successfully",
  });
});

export const getJob = asyncHandler(async (req, res) => {
  const job = await getAllJobs();
  res.status(200).json({
    success: true,
    job,
  });
});

export const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const job = await getJobsById(id);
  res.status(200).json({
    success: true,
    job,
  });
});


export const searchJob = asyncHandler(async (req, res) => {
  const { keyword, tags, company, page, limit } = req.query;

  const result = await searchJobs({
    keyword,
    tags,
    company,
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  });

  res.status(200).json({
    success: true,
    ...result,
  });
});
