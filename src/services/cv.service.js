import CV from "../models/Cv.js";
import { AppError } from "../utils/errorHandler.js";

export const createCV = async (userId, sections, visibility, pdfUrl) => {
  if (!userId) throw new AppError("UserId is required", 400);

  const cv = await CV.create({
    userId,
    sections,
    visibility: visibility || "private",
    pdfUrl: pdfUrl ?? null,
    pdfGeneratedAt: pdfUrl ? Date.now() : null,
  });

  return cv;
};

export const updateCV = async (cvId, sections, visibility, pdfUrl) => {
  const cv = await CV.findById(cvId);
  if (!cv) throw new AppError("CV not found", 404);

  if (sections) cv.sections = sections;
  if (visibility) cv.visibility = visibility;
  if (pdfUrl) {
    cv.pdfUrl = pdfUrl;
    cv.pdfGeneratedAt = Date.now();
  }

  await cv.save();
  return cv;
};

export const deleteCV = async (cvId) => {
  const cv = await CV.findById(cvId);
  if (!cv) throw new AppError("CV not found", 404);

  await cv.deleteOne();
  return true;
};

export const getCVById = async (cvId) => {
  const cv = await CV.findById(cvId);
  if (!cv) throw new AppError("CV not found", 404);

  return cv;
};

export const getUserCVs = async (userId) => {
  const cvs = await CV.find({ userId }).sort({ createdAt: -1 });
  return cvs;
};

export const getPublicCVs = async () => {
  return await CV.find({ visibility: "public" });
};
