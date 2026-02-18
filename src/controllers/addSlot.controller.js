import { asyncHandler, AppError } from '../utils/errorHandler.js';
import AdSlot from '../models/Slot.js';

export const getAdSlots = asyncHandler(async (req, res) => {
  const adSlots = await AdSlot.find({ active: true });
  res.json({ success: true, data: adSlots });
});

export const updateAdSlot = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const { adCode, active, allowedPages, description } = req.body;
  
  const adSlot = await AdSlot.findOneAndUpdate(
    { key },
    { adCode, active, allowedPages, description },
    { new: true, upsert: true }
  );
  res.json({ success: true, data: adSlot });
});
export const deleteAdSlot = asyncHandler(async (req, res) => {
  await AdSlot.findOneAndDelete({ key: req.params.key });
  res.json({ success: true, message: 'Ad slot deleted' });
});