import Slot from "../models/Slot.js";
import { AppError } from "../utils/errorHandler.js";

export const createSlot = async (data) => {
  const slot = await Slot.create(data);
  return slot;
};

export const updateSlot = async (slotId, data) => {
  const slot = await Slot.findById(slotId);
  if (!slot) throw new AppError("Slot not found", 404);

  Object.assign(slot, data);
  await slot.save();
  return slot;
};

export const deleteSlot = async (slotId) => {
  const slot = await Slot.findById(slotId);
  if (!slot) throw new AppError("Slot not found", 404);

  await slot.deleteOne();
  return true;
};

export const getAllSlots = async () => {
  return await Slot.find().sort({ createdAt: -1 });
};

export const getActiveSlots = async (page) => {
  return await Slot.find({
    active: true,
    allowedPages: page,
  });
};
