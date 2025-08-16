/**
 * Analytics Controller
 * 
 * Handles HTTP requests for AI-powered analytics features.
 * Manages chatbot interactions and product-related query processing.
 * Integrates with Google Gemini AI for natural language understanding.
 */

import GeminiService from '../services/GeminiService.js';
import ProductService from '../services/ProductService.js';
import Product from '../models/ProductModel.js';

// Lazy initialization of AI service to optimize startup time
let geminiService = null;
const productService = new ProductService(Product);

/**
 * Lazy Gemini Service Initializer
 * 
 * Creates GeminiService instance only when needed to avoid unnecessary
 * API connections during server startup.
 * 
 * @function getGeminiService
 * @returns {GeminiService} Initialized Gemini AI service instance
 */
const getGeminiService = () => {
  if (!geminiService) {
    geminiService = new GeminiService();
  }
  return geminiService;
};

/**
 * AI Chatbot Controller
 * 
 * Processes natural language queries about user's products using AI.
 * Validates input, fetches user's product data, and generates contextual responses.
 * 
 * @async
 * @function chatbot
 * @param {Object} req - Express request object with prompt in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with AI-generated reply or error message
 * @route POST /api/analytics/chatbot
 */
export const chatbot = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Validate input prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Valid prompt is required' 
      });
    }

    // Extract authenticated user ID from middleware
    const userId = req.user._id;

    // Fetch user's product inventory for context
    const products = await productService.getProducts(userId);

    // Process natural language query with AI service
    const reply = await getGeminiService().processProductQuery(
      prompt.trim(), 
      products, 
      userId
    );

    // Return AI-generated response
    res.status(200).json({ reply });

  } catch (error) {
    console.error('Error in chatbot controller:', error);
    
    // Handle specific AI service errors
    if (error.message.includes('Gemini API')) {
      return res.status(503).json({ 
        error: 'AI service temporarily unavailable' 
      });
    }
    
    // Handle generic errors
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};
