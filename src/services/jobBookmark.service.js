import User from "../models/User.js";
import Job from "../models/Job.js";
import { AppError } from "../utils/errorHandler.js";

export const toggleSaveJob = async (userId, jobId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  const job = await Job.findById(jobId);
  if (!job) throw new AppError("Job not found", 404);

  const isSaved = user.savedJobs.includes(jobId);

  if (isSaved) {
    user.savedJobs = user.savedJobs.filter(
      (id) => id.toString() !== jobId
    );
  } else {
    user.savedJobs.push(jobId);
  }

  await user.save();

  return {
    saved: !isSaved,
  };
};

export const getSavedJobs = async (userId) => {
  const user = await User.findById(userId)
    .populate({
      path: "savedJobs",
      match: { active: true }, 
      options: { sort: { createdAt: -1 } },
    });

  if (!user) throw new AppError("User not found", 404);

  return user.savedJobs;
};