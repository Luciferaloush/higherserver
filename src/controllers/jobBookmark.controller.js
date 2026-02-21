import { toggleSaveJob , getSavedJobs} from "../services/jobBookmark.service.js";
import { AppError, asyncHandler } from "../utils/errorHandler.js";

export const saveJob = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.body;

  const result = await toggleSaveJob(userId, jobId);

  res.status(200).json({
    success: true,
    ...result,
  });
});

export const fetchSavedJobs = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const savedJobs = await getSavedJobs(userId);

  res.status(200).json({
    success: true,
    results: savedJobs.length,
    jobs: savedJobs,
  });
});