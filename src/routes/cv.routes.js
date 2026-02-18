import express from "express";
import multer from "multer";
import { protect, requireAdmin, requireUser } from '../middlewares/auth.js';

import {
  createCVController,
  updateCVController,
  deleteCVController,
  getCVByIdController,
  getUserCVsController,
  getPublicCVsController,
} from "../controllers/cv.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/cv/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("pdf")) {
      cb(new Error("Only PDF files allowed"));
    } else cb(null, true);
  },
});

router.post("/create", protect,requireUser, upload.single("pdf"), createCVController);

router.put("/update/:id", upload.single("pdf"), updateCVController);

router.delete("/delete/:id", deleteCVController);

router.get("/:id", getCVByIdController);

router.get("/user/me",protect, requireUser, getUserCVsController);
router.get("/user/al", getUserCVsController);

router.get("/", getPublicCVsController);

export default router;
