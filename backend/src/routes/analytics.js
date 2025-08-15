import { Router } from 'express';
import { chatbot } from '../controllers/analyticsController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = Router();

// Chatbot endpoint for product-related queries
router.post('/chatbot', protectRoute, chatbot);

export default router;
