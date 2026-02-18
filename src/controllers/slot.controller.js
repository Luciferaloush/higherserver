import {
  createSlot,
  updateSlot,
  deleteSlot,
  getAllSlots,
  getActiveSlots,
} from "../services/slots.service.js";

import { asyncHandler } from "../utils/errorHandler.js";

export const createSlotController = asyncHandler(async (req, res) => {
  const slot = await createSlot(req.body);
  res.json({ status: "success", slot });
});

export const updateSlotController = asyncHandler(async (req, res) => {
  const slot = await updateSlot(req.params.id, req.body);
  res.json({ status: "success", slot });
});

export const deleteSlotController = asyncHandler(async (req, res) => {
  await deleteSlot(req.params.id);
  res.json({ status: "success", message: "Slot deleted" });
});

export const getAllSlotsController = asyncHandler(async (req, res) => {
  const slots = await getAllSlots();
  res.json({ status: "success", slots });
});

export const getActiveSlotsController = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const slots = await getActiveSlots(page);
  res.json({ status: "success", slots });
});
