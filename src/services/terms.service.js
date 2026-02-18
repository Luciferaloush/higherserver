import Terms from "../models/Terms.js";
import { AppError } from "../utils/errorHandler.js";

export const getActiveTerms = async () => {
  const terms = await Terms.findOne({ isActive: true });
  if (!terms) throw new AppError("No active terms found", 404);
  return terms;
};

export const getAllTerms = async () => {
  return await Terms.find().sort({ version: -1 });
};

export const createTerms = async (data) => {
  const last = await Terms.findOne().sort({ version: -1 });
  const newVersion = last ? last.version + 1 : 1;

  await Terms.updateMany({}, { isActive: false });

  return await Terms.create({
    ...data,
    version: newVersion,
    isActive: true,
  });
};

export const updateTerms = async (id, data) => {
  const terms = await Terms.findById(id);
  if (!terms) throw new AppError("Terms not found", 404);

  Object.assign(terms, data);
  await terms.save();
  return terms;
};

export const deleteTerms = async (id) => {
  const terms = await Terms.findById(id);
  if (!terms) throw new AppError("Terms not found", 404);

  await terms.deleteOne();
  return true;
};

export const activateTerms = async (id) => {
  await Terms.updateMany({}, { isActive: false });

  const terms = await Terms.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );

  if (!terms) throw new AppError("Terms not found", 404);
  return terms;
};
