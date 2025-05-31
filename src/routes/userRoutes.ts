import express from "express";
import { findUserByEmail, loginUser, registerUser } from "../controllers/userCtrl";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/search-user', authenticate, findUserByEmail);
export default router;
