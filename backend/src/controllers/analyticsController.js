import GeminiService from '../services/GeminiService.js';
import ProductService from '../services/ProductService.js';
import Product from '../models/ProductModel.js';

const geminiService = new GeminiService();
const productService = new ProductService(Product);

export const chatbot = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Valid prompt is required' 
      });
    }

    // Get authenticated user ID from middleware
    const userId = req.user._id;

    // Fetch user's products
    const products = await productService.getProducts(userId);

    // Process query with Gemini
    const reply = await geminiService.processProductQuery(prompt.trim(), products, userId);

    res.status(200).json({ reply });

  } catch (error) {
    console.error('Error in chatbot controller:', error);
    
    // Handle specific errors
    if (error.message.includes('Gemini API')) {
      return res.status(503).json({ 
        error: 'AI service temporarily unavailable' 
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};
