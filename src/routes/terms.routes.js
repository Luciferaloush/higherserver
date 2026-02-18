import express from "express";
import {
  getTermsForApp,
  getAllTermsForAdmin,
  addTerms,
  editTerms,
  removeTerms,
  activateTermsVersion,
} from "../controllers/terms.controller.js";

const router = express.Router();

router.get("/terms", getTermsForApp);

/* Admin Panel */
router.get("/terms/all", getAllTermsForAdmin);
router.post("/terms", addTerms);
router.put("/terms/:id", editTerms);
router.delete("/terms/:id", removeTerms);
router.patch("/terms/:id/activate", activateTermsVersion);

export default router;
