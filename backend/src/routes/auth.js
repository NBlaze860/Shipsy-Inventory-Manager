import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  checkAuthUser,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protectRoute, getUserProfile);
router.get("/check", protectRoute, checkAuthUser);

export default router;
