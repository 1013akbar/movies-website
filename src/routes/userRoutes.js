import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { updateProfileSchema } from "./schemas.js";

const router = Router();
router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, validate(updateProfileSchema), updateProfile);
export default router;
