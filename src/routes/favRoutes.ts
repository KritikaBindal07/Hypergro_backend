import { Router } from "express";

import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../controllers/favCtrl";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/:propertyId", authenticate, addToFavorites);
router.get("/", authenticate, getFavorites);
router.delete("/:propertyId", authenticate, removeFromFavorites);

export default router;
