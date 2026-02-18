import express from "express";
import {
  createSlotController,
  updateSlotController,
  deleteSlotController,
  getAllSlotsController,
  getActiveSlotsController,
} from "../controllers/slot.controller.js";

import { protect, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

/** Admin Routes */
router.post("/create", protect, requireAdmin, createSlotController);
router.put("/update/:id", protect, requireAdmin, updateSlotController);
router.delete("/delete/:id", protect, requireAdmin, deleteSlotController);
router.get("/admin/all", protect, requireAdmin, getAllSlotsController);

/** User Route */
router.get("/active", getActiveSlotsController);

export default router;
