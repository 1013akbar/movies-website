import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  createReview, listMyReviews, getReviewById, updateReview, deleteReview
} from "../controllers/reviewController.js";
import { reviewCreateSchema, reviewUpdateSchema } from "./schemas.js";

const router = Router();

router.post("/", requireAuth, validate(reviewCreateSchema), createReview);
router.get("/", requireAuth, listMyReviews);
router.get("/:id", requireAuth, getReviewById);
router.put("/:id", requireAuth, validate(reviewUpdateSchema), updateReview);
router.delete("/:id", requireAuth, deleteReview);

export default router;
