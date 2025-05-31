import express from 'express';

// import { findUserByEmail, recommendProperty, getRecommendationsReceived } from '../controllers/recommendations';
import { authenticate } from '../middleware/authMiddleware';
import { getRecommendationsReceived, recommendProperty } from '../controllers/recommendatonCtrl';

const router = express.Router();


router.post('/recommend', authenticate, recommendProperty);
router.get('/', authenticate, getRecommendationsReceived);

export default router;
