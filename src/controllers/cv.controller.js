import {
  createCV,
  updateCV,
  deleteCV,
  getCVById,
  getUserCVs,
  getPublicCVs,
} from "../services/cv.service.js";
import { AppError, asyncHandler } from '../utils/errorHandler.js';

export const createCVController = asyncHandler (async(req, res, next) => {
  try {
    const { sections, visibility } = req.body;
    const userId = req.user.id;

    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const cv = await createCV(userId, sections, visibility, pdfUrl);

    res.status(200).json({ status: "success", cv });
  } catch (error) {
    next(error);
  }
});

export const updateCVController = asyncHandler (async(req, res, next) => {
  try {
    const { sections, visibility } = req.body;
    const { id } = req.params;

    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const cv = await updateCV(id, sections, visibility, pdfUrl);

    res.json({ status: "success", cv });
  } catch (error) {
    next(error);
  }
});

export const deleteCVController = asyncHandler (async(req, res, next) => {
  try {
    await deleteCV(req.params.id);
    res.json({ status: "success", message: "CV deleted" });
  } catch (error) {
    next(error);
  }
});

export const getCVByIdController = asyncHandler (async(req, res, next) => {
  try {
    const cv = await getCVById(req.params.id);
    res.json({ status: "success", cv });
  } catch (error) {
    next(error);
  }
});

export const getUserCVsController = asyncHandler (async(req, res, next) => {
  try {
    const cvs = await getUserCVs(req.user.id);
    res.json({ status: "success", cvs });
  } catch (error) {
    next(error);
  }
});

export const getPublicCVsController = asyncHandler (async(req, res, next) => {
  try {
    const cvs = await getPublicCVs();
    res.json({ status: "success", cvs });
  } catch (error) {
    next(error);
  }
});
