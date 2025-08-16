/**
 * Analytics and AI Routes
 * 
 * Defines HTTP endpoints for AI-powered analytics features.
 * Currently handles chatbot interactions for product-related queries.
 * All routes require user authentication for personalized responses.
 */

import { Router } from 'express';
import { chatbot } from '../controllers/analyticsController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

// Initialize Express router for analytics endpoints
const router = Router();

// AI chatbot endpoint - processes natural language queries about user's products
// POST /api/analytics/chatbot - Send message to AI assistant
router.post('/chatbot', protectRoute, chatbot);

export default router;
