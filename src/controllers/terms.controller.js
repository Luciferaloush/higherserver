import { asyncHandler } from "../utils/errorHandler.js";
import {
  getActiveTerms,
  getAllTerms,
  createTerms,
  updateTerms,
  deleteTerms,
  activateTerms,
} from "../services/terms.service.js";

export const getTermsForApp = asyncHandler(async (req, res) => {
  const terms = await getActiveTerms();
  res.json({ success: true, data: terms });
});

export const getAllTermsForAdmin = asyncHandler(async (req, res) => {
  const terms = await getAllTerms();
  res.json({ success: true, data: terms });
});

export const addTerms = asyncHandler(async (req, res) => {
  const terms = await createTerms(req.body);
  res.status(200).json({
    success: true,
    message: "Terms added successfully",
    data: terms,
  });
});

export const editTerms = asyncHandler(async (req, res) => {
  const terms = await updateTerms(req.params.id, req.body);
  res.json({
    success: true,
    message: "Terms updated successfully",
    data: terms,
  });
});

export const removeTerms = asyncHandler(async (req, res) => {
  await deleteTerms(req.params.id);
  res.json({ success: true, message: "Terms deleted successfully" });
});

export const activateTermsVersion = asyncHandler(async (req, res) => {
  const terms = await activateTerms(req.params.id);
  res.json({
    success: true,
    message: "Terms activated",
    data: terms,
  });
});
